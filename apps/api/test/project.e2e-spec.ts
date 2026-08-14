import request from 'supertest';
import { setupE2EApp } from './utils/e2e-app';
import { createWorkspace } from './utils/e2e-helpers';
import { CreateProjectOutput } from 'src/application/project/create-project/create-project.output';
import { UpdateProjectOutput } from 'src/application/project/update-project/update-project.output';
import { DeleteProjectOutput } from 'src/application/project/delete-project/delete-project.output';
import { GetProjectsOutput } from 'src/application/project/get-projects/get-projects.output';
import { GetProjectOutput } from 'src/application/project/get-project/get-project.output';

type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

describe('Project (e2e)', () => {
  const { getApp } = setupE2EApp();

  it('should create a project', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const project = {
      name: 'Project 1',
    };

    // Act
    const createProjectRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/projects`)
      .send(project);

    const createProjectResponse =
      createProjectRequest.body as CreateProjectOutput;

    // Assert
    expect(createProjectRequest.status).toBe(201);
    expect(createProjectResponse.id).toBeDefined();
    expect(createProjectResponse.workspaceId).toBe(workspace.id);
    expect(createProjectResponse.name).toBe(project.name);
  });

  it('should update a project', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const project = {
      name: 'Project 1',
    };

    const createProjectRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/projects`)
      .send(project);

    const createProjectResponse =
      createProjectRequest.body as CreateProjectOutput;

    // Act
    const projectUpdate = {
      name: 'Project updated',
    };

    const updateProjectRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/projects/${createProjectResponse.id}`)
      .send(projectUpdate);

    const updateProjectResponse =
      updateProjectRequest.body as UpdateProjectOutput;

    // Arrange
    expect(updateProjectRequest.status).toBe(200);
    expect(updateProjectResponse.workspaceId).toBe(workspace.id);
    expect(updateProjectResponse.name).toBe(projectUpdate.name);
  });

  it('should return an error if the updating project does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const projectUpdateFail = 'project-update-to-fail';
    const projectUpdate = {
      name: 'Project updated',
    };

    // Act

    const updateProjectRequest = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}/projects/${projectUpdateFail}`)
      .send(projectUpdate);

    const updateprojectResponse = updateProjectRequest.body as ErrorResponse;

    // Arrange
    expect(updateProjectRequest.status).toBe(500);
    expect(updateprojectResponse.message).toBe('Internal server error');
  });

  it('should delete a project', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const project = {
      name: 'Project 1',
    };

    const createProjectRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/projects`)
      .send(project);

    const createProjectResponse =
      createProjectRequest.body as CreateProjectOutput;

    // Act
    const projectDeleteRequest = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}/projects/${createProjectResponse.id}`,
    );

    const projectDeleteResponse =
      projectDeleteRequest.body as DeleteProjectOutput;

    // Assert
    expect(projectDeleteRequest.status).toBe(200);
    expect(projectDeleteResponse.id).toBe(createProjectResponse.id);
  });

  it('should return an error if the project to delete does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const projectId = 'project-delete-to-fail';

    // Act
    const deleteProjectRequest = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}/projects/${projectId}`,
    );
    const deleteprojectResponse = deleteProjectRequest.body as ErrorResponse;

    // Assert
    expect(deleteProjectRequest.status).toBe(500);
    expect(deleteprojectResponse.message).toBe('Internal server error');
  });

  it('should return all the projects of a workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const project1 = {
      name: 'Project 1',
    };
    const project2 = {
      name: 'Project 2',
    };

    const createProjectRequest1 = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/projects`)
      .send(project1);

    const createProjectResponse1 =
      createProjectRequest1.body as CreateProjectOutput;

    const createProjectRequest2 = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/projects`)
      .send(project2);
    const createProjectResponse2 =
      createProjectRequest2.body as CreateProjectOutput;

    // Act
    const getAllProjectsRequest = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}/projects`,
    );

    const getAllProjectsResponse =
      getAllProjectsRequest.body as GetProjectsOutput;

    // Assert
    expect(getAllProjectsRequest.status).toBe(200);
    expect(getAllProjectsResponse.projects).toHaveLength(2);
    expect(getAllProjectsResponse.projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: createProjectResponse1.id,
          workspaceId: createProjectResponse1.workspaceId,
          name: createProjectResponse1.name,
        }),
        expect.objectContaining({
          id: createProjectResponse2.id,
          workspaceId: createProjectResponse2.workspaceId,
          name: createProjectResponse2.name,
        }),
      ]),
    );
  });

  it('should return the project by id in the workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const project = {
      name: 'Project 1',
    };

    const createProjectRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/projects`)
      .send(project);

    const createprojectResponse =
      createProjectRequest.body as CreateProjectOutput;

    // Act
    const getProjectRequest = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}/projects/${createprojectResponse.id}`,
    );
    const getProjectResponse = getProjectRequest.body as GetProjectOutput;

    // Assert
    expect(getProjectRequest.status).toBe(200);
    expect(getProjectResponse.project.id).toBe(createprojectResponse.id);
    expect(getProjectResponse.project.workspaceId).toBe(
      createprojectResponse.workspaceId,
    );
    expect(getProjectResponse.project.name).toBe(createprojectResponse.name);
  });

  it('should return an error if the project does not exist', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());
    const failProjectId = 'fail-project-id';

    // Act
    const getProjectRequest = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}/projects/${failProjectId}`,
    );
    const getProjectResponse = getProjectRequest.body as ErrorResponse;

    // Assert
    expect(getProjectRequest.status).toBe(500);
    expect(getProjectResponse.message).toBe('Internal server error');
  });
});
