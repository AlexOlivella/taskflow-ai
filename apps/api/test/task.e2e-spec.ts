import request from 'supertest';
import { setupE2EApp } from './utils/e2e-app';
import { createWorkspace } from './utils/e2e-helpers';
import { CreateTaskOutput } from 'src/application/task/create-task/create-task.output';
import { GetTasksOutput } from 'src/application/task/get-tasks/get-tasks.output';
import { TaskStatus } from 'src/domain/task/task-status.enum';
import { GetTaskOutput } from 'src/application/task/get-task/get-task.output';
import { UpdateTaskOutput } from 'src/application/task/update-task/update-task.output';
import { DeleteTaskOutput } from 'src/application/task/delete-task/delete-task.output';
import { AssignTaskOutput } from 'src/application/task/assign-task/assign-task.output';
import { ChangeTaskStatusOutput } from 'src/application/task/change-task-status/change-task-status.output';

type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

describe('Task (e2e)', () => {
  const { getApp } = setupE2EApp();

  it('should create a task', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task = {
      name: 'Task 1',
    };

    // Act
    const createTaskRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task);

    const createTaskResponse = createTaskRequest.body as CreateTaskOutput;

    // Assert
    expect(createTaskRequest.status).toBe(201);
    expect(createTaskResponse.id).toBeDefined();
  });

  it('should return all the tasks', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task1 = {
      name: 'Task 1',
    };
    const task2 = {
      name: 'Task 2',
    };

    const createTaskRequest1 = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task1);

    const createTaskResponse1 = createTaskRequest1.body as CreateTaskOutput;

    const createTaskRequest2 = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task2);

    const createTaskResponse2 = createTaskRequest2.body as CreateTaskOutput;

    // Act
    const getAllTasksRequest = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}/tasks`,
    );
    const getAllTaskResponse = getAllTasksRequest.body as GetTasksOutput;

    // Assert
    expect(getAllTasksRequest.status).toBe(200);
    expect(getAllTaskResponse.tasks).toHaveLength(2);
    expect(getAllTaskResponse.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: createTaskResponse1.id,
          workspaceId: workspace.id,
          name: task1.name,
          projectId: null,
          assigneeId: null,
          status: TaskStatus.TODO,
        }),
        expect.objectContaining({
          id: createTaskResponse2.id,
          workspaceId: workspace.id,
          name: task2.name,
          projectId: null,
          assigneeId: null,
          status: TaskStatus.TODO,
        }),
      ]),
    );
  });

  it('should return the task', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task = {
      name: 'Task 1',
    };

    const createTaskRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task);
    const createTaskResponse = createTaskRequest.body as CreateTaskOutput;

    // Act
    const getTaskRequest = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}/tasks/${createTaskResponse.id}`,
    );
    const getTaskResponse = getTaskRequest.body as GetTaskOutput;

    // Assert
    expect(getTaskRequest.status).toBe(200);
    expect(getTaskResponse.id).toBe(createTaskResponse.id);
    expect(getTaskResponse.name).toBe(task.name);
    expect(getTaskResponse.status).toBe(TaskStatus.TODO);
  });

  it('should return error if the task does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const taskFailId = 'task-fail-id';

    // Act
    const getTaskRequest = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}/tasks/${taskFailId}`,
    );
    const getTaskResponse = getTaskRequest.body as ErrorResponse;

    // Assert
    expect(getTaskRequest.status).toBe(500);
    expect(getTaskResponse.message).toBe('Internal server error');
  });

  it('should update the task', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task = {
      name: 'Task 1',
    };

    const createTaskRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task);
    const createTaskResponse = createTaskRequest.body as CreateTaskOutput;

    // Act
    const taskUpdate = { name: 'Task updated' };
    const updateTaskRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/tasks/${createTaskResponse.id}`)
      .send(taskUpdate);

    const updateTaskResponse = updateTaskRequest.body as UpdateTaskOutput;

    // Assert
    expect(updateTaskRequest.status).toBe(200);
    expect(updateTaskResponse.task.id).toBe(createTaskResponse.id);
    expect(updateTaskResponse.task.name).toBe(taskUpdate.name);
  });

  it('should return error if the task to update does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const taskFailId = 'task-fail-id';

    // Act
    const updateTaskRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/tasks/${taskFailId}`)
      .send({ name: 'Task fail update' });
    const updateTaskResponse = updateTaskRequest.body as ErrorResponse;

    // Assert
    expect(updateTaskRequest.status).toBe(500);
    expect(updateTaskResponse.message).toBe('Internal server error');
  });

  it('should delete the task', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task = {
      name: 'Task 1',
    };

    const createTaskRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task);
    const createTaskResponse = createTaskRequest.body as CreateTaskOutput;

    // Act
    const deleteTaskRequest = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}/tasks/${createTaskResponse.id}`,
    );

    const deleteTaskResponse = deleteTaskRequest.body as DeleteTaskOutput;

    // Assert
    expect(deleteTaskRequest.status).toBe(200);
    expect(deleteTaskResponse.id).toBe(createTaskResponse.id);
  });

  it('should return error if the task to delete does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const taskFailId = 'task-fail-id';

    // Act
    const deleteTaskRequest = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}/tasks/${taskFailId}`,
    );
    const deleteTaskResponse = deleteTaskRequest.body as ErrorResponse;

    // Assert
    expect(deleteTaskRequest.status).toBe(500);
    expect(deleteTaskResponse.message).toBe('Internal server error');
  });

  it('should assign the task', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task = {
      name: 'Task 1',
    };

    const createTaskRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task);
    const createTaskResponse = createTaskRequest.body as CreateTaskOutput;

    // Act
    const assigneeId = { assigneeId: 'assign-id' };
    const assignTaskRequest = await request(getApp().getHttpServer())
      .put(
        `/workspaces/${workspace.id}/tasks/${createTaskResponse.id}/assignee`,
      )
      .send(assigneeId);

    const assignTaskResponse = assignTaskRequest.body as AssignTaskOutput;

    // Assert
    expect(assignTaskRequest.status).toBe(200);
    expect(assignTaskResponse.task.id).toBe(createTaskResponse.id);
    expect(assignTaskResponse.task.assigneeId).toBe(assigneeId.assigneeId);
    expect(assignTaskResponse.task.workspaceId).toBe(workspace.id);
    expect(assignTaskResponse.task.name).toBe(task.name);
  });

  it('should return error if the task to assign does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const taskFailId = 'task-fail-id';

    // Act
    const assigneeId = { assigneeId: 'assign-id' };
    const assignTaskRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/tasks/${taskFailId}/assignee`)
      .send(assigneeId);
    const assignTaskResponse = assignTaskRequest.body as ErrorResponse;

    // Assert
    expect(assignTaskRequest.status).toBe(500);
    expect(assignTaskResponse.message).toBe('Internal server error');
  });

  it('should change the task status', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const task = {
      name: 'Task 1',
    };

    const createTaskRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/tasks`)
      .send(task);
    const createTaskResponse = createTaskRequest.body as CreateTaskOutput;

    // Act
    const taskStatus = { status: TaskStatus.IN_PROGRESS };
    const changeTaskStatusRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/tasks/${createTaskResponse.id}/status`)
      .send(taskStatus);

    const changeTaskStatusResponse =
      changeTaskStatusRequest.body as ChangeTaskStatusOutput;

    // Assert
    expect(changeTaskStatusRequest.status).toBe(200);
    expect(changeTaskStatusResponse.task.id).toBe(createTaskResponse.id);
    expect(changeTaskStatusResponse.task.workspaceId).toBe(workspace.id);
    expect(changeTaskStatusResponse.task.name).toBe(task.name);
    expect(changeTaskStatusResponse.task.status).toBe(TaskStatus.IN_PROGRESS);
  });

  it('should return error if the task to change status does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const taskFailId = 'task-fail-id';

    // Act
    const taskStatus = { status: TaskStatus.IN_PROGRESS };
    const changeTaskStatusRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/tasks/${taskFailId}/status`)
      .send(taskStatus);

    const changeTaskStatusResponse =
      changeTaskStatusRequest.body as ErrorResponse;

    // Assert
    expect(changeTaskStatusRequest.status).toBe(500);
    expect(changeTaskStatusResponse.message).toBe('Internal server error');
  });
});
