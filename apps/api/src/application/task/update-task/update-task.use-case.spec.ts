import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { UpdateTaskUseCase } from './update-task.use-case';
import { Task } from 'src/domain/task/task.entity';
import { TaskNotFoundError } from '../errors/task-not-found.error';
import { TaskStatus } from 'src/domain/task/task-status.enum';

describe('UpdateTaskUseCase', () => {
  it('should update the task', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    await taskRepository.save(
      new Task('task-1', 'workspace-1', null, null, 'Task 1', TaskStatus.TODO),
    );
    const useCase = new UpdateTaskUseCase(taskRepository);

    // Act
    const output = await useCase.execute({
      id: 'task-1',
      name: 'Task Updated',
    });

    // Assert
    const task = await taskRepository.findById('task-1');

    expect(output.task.id).toBe('task-1');
    expect(output.task.name).toBe('Task Updated');
    expect(task?.id).toBe('task-1');
    expect(task?.name).toBe('Task Updated');
  });

  it('should throw when task does not exist', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new UpdateTaskUseCase(taskRepository);

    // Act & Assert
    await expect(
      useCase.execute({ id: 'task-1', name: 'Task error' }),
    ).rejects.toThrow(TaskNotFoundError);
  });
});
