import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { CreateTaskUseCase } from './create-task.use-case';
import { CreateTaskInput } from './create-task.input';
import { IdGenerator } from 'src/application/shared/id-generator';

describe('CreateTaskUseCase', () => {
  class FakeIdGenerator implements IdGenerator {
    generate(): string {
      return 'task-123';
    }
  }

  it('should create a task and return its data', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const idGenerator = new FakeIdGenerator();

    const useCase = new CreateTaskUseCase(taskRepository, idGenerator);
    const input: CreateTaskInput = {
      workspaceId: 'workspace-1',
      projectId: null,
      assigneeId: null,
      name: 'Task 1',
    };
    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.id).toBe('task-123');

    const task = await taskRepository.findById('task-123');
    expect(task).not.toBeNull();
    expect(task?.id).toBe('task-123');
    expect(task?.workspaceId).toBe('workspace-1');
    expect(task?.projectId).toBeNull();
    expect(task?.name).toBe('Task 1');
  });
});
