import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { GetTaskUseCase } from './get-task.use-case';
import { Task } from 'src/domain/task/task.entity';
import { TaskNotFoundError } from '../errors/task-not-found.error';

describe('GetTaskUseCase', () => {
  it('should return the task', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new GetTaskUseCase(taskRepository);
    await taskRepository.save(
      new Task('task-1', 'workspace-1', 'project-1', null, 'Task 1'),
    );

    // Act
    const output = await useCase.execute({ id: 'task-1' });

    // Assert
    expect(output.id).toBe('task-1');
    expect(output.workspaceId).toBe('workspace-1');
    expect(output.projectId).toBe('project-1');
    expect(output.name).toBe('Task 1');
  });

  it('should throw when task does not exist', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new GetTaskUseCase(taskRepository);

    // Act & Assert
    await expect(useCase.execute({ id: 'task-1' })).rejects.toThrow(
      TaskNotFoundError,
    );
  });
});
