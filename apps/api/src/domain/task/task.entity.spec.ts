import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

describe('Task', () => {
  it('should throw when name is empty', () => {
    expect(
      () => new Task('task-1', 'workspace-1', null, null, '', TaskStatus.TODO),
    ).toThrow('Task name cannot be empty.');
  });

  it('should throw when name contains only spaces', () => {
    expect(
      () =>
        new Task(
          'task-1',
          'workspace-1',
          'project-1',
          null,
          '          ',
          TaskStatus.TODO,
        ),
    ).toThrow('Task name cannot be empty.');
  });

  it('should create a task with a valid name', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      'project-1',
      null,
      'Task 1',
      TaskStatus.TODO,
    );

    expect(task.id).toBe('task-1');
    expect(task.workspaceId).toBe('workspace-1');
    expect(task.name).toBe('Task 1');
  });

  it('should create a task without a project', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      null,
      null,
      'Task 1',
      TaskStatus.TODO,
    );

    expect(task.id).toBe('task-1');
    expect(task.workspaceId).toBe('workspace-1');
    expect(task.projectId).toBeNull();
    expect(task.name).toBe('Task 1');
  });

  it('should rename a task with a valid name', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      null,
      null,
      'Task 1',
      TaskStatus.TODO,
    );

    task.rename('Task renamed');

    expect(task.name).toBe('Task renamed');
  });

  it('should throw when renaming to an empty name', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      'project-1',
      null,
      'Task 1',
      TaskStatus.TODO,
    );

    expect(() => task.rename('')).toThrow('Task name cannot be empty.');
  });

  it('should throw when renaming to a name containing only spaces', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      'project-1',
      null,
      'Task 1',
      TaskStatus.TODO,
    );

    expect(() => task.rename('      ')).toThrow('Task name cannot be empty.');
  });

  it('should assign the Task to a user', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      null,
      null,
      'Task 1',
      TaskStatus.TODO,
    );

    task.assignTo('user-1');

    expect(task.assigneeId).toBe('user-1');
  });

  it('should unassign the Task', () => {
    const task = new Task(
      'task-1',
      'workspace-1',
      null,
      'user-1',
      'Task 1',
      TaskStatus.TODO,
    );

    task.assignTo(null);

    expect(task.assigneeId).toBeNull();
  });
});
