import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { DeleteTaskUseCase } from './delete-task.use-case';
import { Task } from 'src/domain/task/task.entity';
import { TaskNotFoundError } from '../errors/task-not-found.error';

describe('DeleteTaskUseCase', () => {
  it('should delete the task', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new DeleteTaskUseCase(taskRepository);

    await taskRepository.save(
      new Task('task-1', 'workspace-1', 'project-1', null, 'Task to delete'),
    );

    // Act
    const output = await useCase.execute({ id: 'task-1' });

    // Assert
    const task = await taskRepository.findById('task-1');
    expect(output.id).toBe('task-1');
    expect(task).toBeNull();
  });

  it('should throw when task does not exist', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new DeleteTaskUseCase(taskRepository);

    // Act & Assert
    await expect(useCase.execute({ id: 'task-1' })).rejects.toThrow(
      TaskNotFoundError,
    );
  });
});
