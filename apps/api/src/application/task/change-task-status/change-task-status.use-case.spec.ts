import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { ChangeTaskStatusUseCase } from './change-task-status.use-case';
import { TaskStatus } from 'src/domain/task/task-status.enum';
import { Task } from 'src/domain/task/task.entity';
import { TaskNotFoundError } from '../errors/task-not-found.error';

describe('ChangeTaskStatusUseCase', () => {
  it('should change the task status', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new ChangeTaskStatusUseCase(taskRepository);

    await taskRepository.save(
      new Task('task-1', 'workspace-1', 'project-1', null, 'Task 1'),
    );

    const taskBefore = await taskRepository.findById('task-1');

    expect(taskBefore?.status).toBe(TaskStatus.TODO);

    // Act
    const output = await useCase.execute({
      id: 'task-1',
      status: TaskStatus.IN_PROGRESS,
    });

    // Assert

    const taskAfter = await taskRepository.findById('task-1');

    expect(output.task.id).toBe('task-1');
    expect(output.task.status).toBe(TaskStatus.IN_PROGRESS);

    expect(taskAfter?.id).toBe('task-1');
    expect(taskAfter?.status).toBe(TaskStatus.IN_PROGRESS);
  });

  it('should throw when task does not exist', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new ChangeTaskStatusUseCase(taskRepository);

    // Act & Assert
    await expect(
      useCase.execute({ id: 'task-1', status: TaskStatus.DONE }),
    ).rejects.toThrow(TaskNotFoundError);
  });
});
