import { InMemoryTaskRepository } from 'src/infrastructure/persistence/in-memory/in-memory-task.repository';
import { GetTasksUseCase } from './get-tasks.use-case';
import { Task } from 'src/domain/task/task.entity';
import { TaskStatus } from 'src/domain/task/task-status.enum';

describe('GetTasksUseCase', () => {
  it('should return the tasks that belongs to the workspace', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new GetTasksUseCase(taskRepository);
    await taskRepository.save(
      new Task('task-1', 'workspace-1', null, null, 'Task 1', TaskStatus.TODO),
    );
    await taskRepository.save(
      new Task(
        'task-2',
        'workspace-1',
        'project-1',
        null,
        'Task 2',
        TaskStatus.TODO,
      ),
    );
    // Act
    const output = await useCase.execute({ workspaceId: 'workspace-1' });

    // Assert
    expect(output.tasks).toHaveLength(2);
    expect(output.tasks[0].id).toBe('task-1');
    expect(output.tasks[0].workspaceId).toBe('workspace-1');
    expect(output.tasks[0].projectId).toBeNull();
    expect(output.tasks[0].name).toBe('Task 1');
    expect(output.tasks[0].status).toBe(TaskStatus.TODO);
    expect(output.tasks[1].id).toBe('task-2');
    expect(output.tasks[1].workspaceId).toBe('workspace-1');
    expect(output.tasks[1].projectId).toBe('project-1');
    expect(output.tasks[1].name).toBe('Task 2');
    expect(output.tasks[1].status).toBe(TaskStatus.TODO);
  });

  it('should return an empty list when there is no tasks in the workspace', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new GetTasksUseCase(taskRepository);
    // Act
    const output = await useCase.execute({ workspaceId: 'workspace-1' });
    // Assert
    expect(output.tasks).toHaveLength(0);
  });

  it('should return only the tasks belonging to the requested workspace', async () => {
    // Arrange
    const taskRepository = new InMemoryTaskRepository();
    const useCase = new GetTasksUseCase(taskRepository);
    await taskRepository.save(
      new Task('task-1', 'workspace-1', null, null, 'Task 1', TaskStatus.TODO),
    );
    await taskRepository.save(
      new Task(
        'task-2',
        'workspace-1',
        'project-1',
        null,
        'Task 2',
        TaskStatus.TODO,
      ),
    );
    await taskRepository.save(
      new Task(
        'task-3',
        'workspace-2',
        'project-1',
        null,
        'Task 3',
        TaskStatus.TODO,
      ),
    );
    // Act
    const output = await useCase.execute({ workspaceId: 'workspace-1' });

    // Assert
    expect(output.tasks).toHaveLength(2);
    expect(
      output.tasks.every((task) => task.workspaceId === 'workspace-1'),
    ).toBe(true);
    expect(output.tasks.map((task) => task.id)).toEqual(['task-1', 'task-2']);
  });
});
