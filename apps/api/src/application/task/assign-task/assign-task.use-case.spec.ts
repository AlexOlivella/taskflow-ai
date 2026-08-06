import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { AssignTaskUseCase } from './assign-task.use-case';
import { TaskNotFoundError } from '../errors/task-not-found.error';
import { Task } from 'src/domain/task/task.entity';
import { TaskStatus } from 'src/domain/task/task-status.enum';

describe('AssignTaskUseCase', () => {
  it('should assign a task to a user', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new AssignTaskUseCase(taskRepository);
    await taskRepository.save(
      new Task(
        'task-1',
        'workspace-1',
        'project-1',
        null,
        'Task 1',
        TaskStatus.TODO,
      ),
    );

    // Act
    const output = await useCase.execute({
      id: 'task-1',
      assigneeId: 'user-1',
    });

    // Assert
    const task = await taskRepository.findById('task-1');

    expect(output.task.id).toBe('task-1');
    expect(output.task.workspaceId).toBe('workspace-1');
    expect(output.task.projectId).toBe('project-1');
    expect(output.task.assigneeId).toBe('user-1');
    expect(output.task.name).toBe('Task 1');
    expect(task?.id).toBe('task-1');
    expect(task?.workspaceId).toBe('workspace-1');
    expect(task?.projectId).toBe('project-1');
    expect(task?.assigneeId).toBe('user-1');
    expect(task?.name).toBe('Task 1');
  });
  it('should unassign a task', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new AssignTaskUseCase(taskRepository);
    await taskRepository.save(
      new Task(
        'task-1',
        'workspace-1',
        'project-1',
        'user-1',
        'Task 1',
        TaskStatus.TODO,
      ),
    );

    // Act
    const output = await useCase.execute({
      id: 'task-1',
      assigneeId: null,
    });

    // Assert
    const task = await taskRepository.findById('task-1');

    expect(output.task.id).toBe('task-1');
    expect(output.task.workspaceId).toBe('workspace-1');
    expect(output.task.projectId).toBe('project-1');
    expect(output.task.assigneeId).toBeNull();
    expect(output.task.name).toBe('Task 1');
    expect(task?.id).toBe('task-1');
    expect(task?.workspaceId).toBe('workspace-1');
    expect(task?.projectId).toBe('project-1');
    expect(task?.assigneeId).toBeNull();
    expect(task?.name).toBe('Task 1');
  });
  it('should throw when task does not exist', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new AssignTaskUseCase(taskRepository);

    // Act & Assert
    await expect(
      useCase.execute({ id: 'task-1', assigneeId: null }),
    ).rejects.toThrow(TaskNotFoundError);
  });
});
