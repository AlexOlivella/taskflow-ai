import request from 'supertest';
import { setupE2EApp } from './utils/e2e-app';
import { CreateWorkspaceOutput } from 'src/application/workspace/create-workspace/create-workspace.output';
import { GetWorkspaceOutput } from 'src/application/workspace/get-workspace/get-workspace.output';
import { CreateWorkspaceInput } from 'src/application/workspace/create-workspace/create-workspace.input';
import { GetWorkspacesOutput } from 'src/application/workspace/get-workspaces/get-workspaces.output';
import { UpdateWorkspaceInput } from 'src/application/workspace/update-workspace/update-workspace.input';
import { UpdateWorkspaceOutput } from 'src/application/workspace/update-workspace/update-workspace.output';
import { DeleteWorkspaceOutput } from 'src/application/workspace/delete-workspace/delete-workspace.output';
import { InviteUserToWorkspaceOutput } from 'src/application/workspace/invite-user-to-workspace/inviteUserToWorkspace.output';
import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';
import { AcceptWorkspaceInvitationOutput } from 'src/application/workspace/accept-workspace-invitation/accept-workspace-invitation.output';
import { RemoveWorkspaceMemberOutput } from 'src/application/workspace/remove-workspace-member/remove-workspace-member.output';
import { ChangeWorkspaceMemberRoleOutput } from 'src/application/workspace/change-workspace-member-role/change-workspace-member-role.output';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';
import { createWorkspace } from './utils/e2e-helpers';

type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

describe('Workspace (e2e)', () => {
  const { getApp } = setupE2EApp();

  it('should create a workspace', async () => {
    // Arrange
    const workspace = {
      name: 'My Workspace',
    };

    // Act
    const response = await request(getApp().getHttpServer())
      .post('/workspaces')
      .send(workspace);

    const body = response.body as CreateWorkspaceOutput;

    // Assert
    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
  });

  it('should get a workspace by id', async () => {
    // Arrange
    const input: CreateWorkspaceInput = {
      name: 'My Workspace',
    };

    const workspace = await createWorkspace(getApp(), input);

    // Act
    const response = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}`,
    );

    const body = response.body as GetWorkspaceOutput;

    // Assert
    expect(response.status).toBe(200);
    expect(body.workspace.id).toBe(workspace.id);
    expect(body.workspace.name).toBe(input.name);
  });

  it('should get all workspaces', async () => {
    // Arrange
    const input1: CreateWorkspaceInput = {
      name: 'Workspace 1',
    };
    const input2: CreateWorkspaceInput = {
      name: 'Workspace 2',
    };

    const workspace1 = await createWorkspace(getApp(), input1);
    const workspace2 = await createWorkspace(getApp(), input2);

    // Act
    const response = await request(getApp().getHttpServer()).get(`/workspaces`);
    const body = response.body as GetWorkspacesOutput;

    // Assert
    expect(response.status).toBe(200);
    expect(body.workspaces).toHaveLength(2);
    expect(body.workspaces).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: workspace1.id,
          name: input1.name,
        }),
        expect.objectContaining({
          id: workspace2.id,
          name: input2.name,
        }),
      ]),
    );
  });

  it('should return 404 when the workspace does not exist', async () => {
    // Arrange
    const workspaceId = 'workspace-that-does-not-exist';

    // Act
    const response = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspaceId}`,
    );
    const body = response.body as ErrorResponse;

    // Assert
    expect(response.status).toBe(404);
    expect(body.message).toBe(`Workspace with id "${workspaceId}" not found`);
  });

  it('should update a workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const workspaceUpdate: UpdateWorkspaceInput = {
      id: workspace.id,
      name: 'Workspace updated',
    };
    // Act
    const updatedResponse = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspaceUpdate.id}`)
      .send(workspaceUpdate);
    const body = updatedResponse.body as UpdateWorkspaceOutput;

    // Assert
    expect(updatedResponse.status).toBe(200);
    expect(body.workspace.id).toBe(workspace.id);
    expect(body.workspace.name).toBe(workspaceUpdate.name);
  });

  it('should return 404 if the workspace to update does not exist', async () => {
    // Arrange
    const workspaceId = 'workspace-that-does-not-exist';

    // Act
    const updateResponse = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspaceId}`)
      .send({ name: 'Workspace updated' });

    const body = updateResponse.body as ErrorResponse;

    // Assert
    expect(updateResponse.status).toBe(404);
    expect(body.message).toBe(`Workspace with id "${workspaceId}" not found`);
  });

  it('should delete a workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    // Act
    const deleteResponse = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}`,
    );

    const body = deleteResponse.body as DeleteWorkspaceOutput;

    // Assert
    expect(deleteResponse.status).toBe(200);
    expect(body.id).toBe(workspace.id);

    const getResponse = await request(getApp().getHttpServer()).get(
      `/workspaces/${workspace.id}`,
    );

    expect(getResponse.status).toBe(404);
  });

  it('should return 404 if the workspace to delete does not exist', async () => {
    // Arrange
    const workspaceId = 'workspace-that-does-not-exist';

    // Act
    const deleteResponse = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspaceId}`,
    );

    const body = deleteResponse.body as ErrorResponse;

    // Assert
    expect(deleteResponse.status).toBe(404);
    expect(body.message).toBe(`Workspace with id "${workspaceId}" not found`);
  });

  it('should invite a user to the workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const invitation = {
      workspaceId: workspace.id,
      inviterId: 'user-1',
      inviteeEmail: 'invitee@email.com',
    };

    // Act
    const inviteUser = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send({ inviteeEmail: invitation.inviteeEmail });

    const inviteResponse = inviteUser.body as InviteUserToWorkspaceOutput;

    // Assert
    expect(inviteUser.status).toBe(201);
    expect(inviteResponse.invitation.inviteeEmail).toBe(
      invitation.inviteeEmail,
    );
    expect(inviteResponse.invitation.inviterId).toBe(invitation.inviterId);
    expect(inviteResponse.invitation.status).toBe(InvitationStatus.PENDING);
  });

  it('should not invite a user who already has a pending invitation', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const invitation = {
      inviteeEmail: 'invitee@email.com',
    };

    await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send(invitation);

    // Act
    const inviteSameUser = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send(invitation);

    const body = inviteSameUser.body as ErrorResponse;

    // Assert
    expect(inviteSameUser.status).toBe(500);
    expect(body.message).toBe('Internal server error');
  });

  it('should accept an invitation', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const invitation = {
      inviteeEmail: 'invitee@email.com',
    };

    const createInvitationRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send(invitation);

    const createInvitationResponse =
      createInvitationRequest.body as InviteUserToWorkspaceOutput;

    // Act
    const acceptInvitationRequest = await request(
      getApp().getHttpServer(),
    ).post(
      `/workspaces/invitations/${createInvitationResponse.invitation.id}/accept`,
    );

    const acceptInvitationResponse =
      acceptInvitationRequest.body as AcceptWorkspaceInvitationOutput;

    // Assert
    expect(acceptInvitationRequest.status).toBe(201);
    expect(acceptInvitationResponse.invitation.inviteeEmail).toBe(
      invitation.inviteeEmail,
    );
    expect(acceptInvitationResponse.invitation.status).toBe(
      InvitationStatus.ACCEPTED,
    );
  });

  it('should return 404 if invitation is not pending', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const invitation = {
      inviteeEmail: 'invitee@email.com',
    };

    const createInvitationRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send(invitation);

    const createInvitationResponse =
      createInvitationRequest.body as InviteUserToWorkspaceOutput;

    await request(getApp().getHttpServer()).post(
      `/workspaces/invitations/${createInvitationResponse.invitation.id}/accept`,
    );

    // Act
    const acceptInvitationErrorRequest = await request(
      getApp().getHttpServer(),
    ).post(
      `/workspaces/invitations/${createInvitationResponse.invitation.id}/accept`,
    );
    const errorResponse = acceptInvitationErrorRequest.body as ErrorResponse;

    // Assert
    expect(acceptInvitationErrorRequest.status).toBe(500);
    expect(errorResponse.message).toBe('Internal server error');
  });

  it('should remove a member from the workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const invitation = {
      inviteeEmail: 'invitee@email.com',
    };

    const createInvitationRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send(invitation);

    const createInvitationResponse =
      createInvitationRequest.body as InviteUserToWorkspaceOutput;

    const acceptInvitationRequest = await request(
      getApp().getHttpServer(),
    ).post(
      `/workspaces/invitations/${createInvitationResponse.invitation.id}/accept`,
    );

    const acceptInvitationResponse =
      acceptInvitationRequest.body as AcceptWorkspaceInvitationOutput;

    // Act
    const removeMemberRequest = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}/members/${acceptInvitationResponse.invitation.userId}`,
    );

    const removeMemberResponse =
      removeMemberRequest.body as RemoveWorkspaceMemberOutput;

    // Assert
    expect(removeMemberRequest.status).toBe(200);
    expect(removeMemberResponse.userId).toBe(
      acceptInvitationResponse.invitation.userId,
    );
    expect(removeMemberResponse.workspaceId).toBe(workspace.id);
  });

  it('should return an error if member does not exist when removing', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const userIdNoMember = 'user-id-no-member';
    // Act
    const removeMemberRequest = await request(getApp().getHttpServer()).delete(
      `/workspaces/${workspace.id}/members/${userIdNoMember}`,
    );

    const removeMemberResponse = removeMemberRequest.body as ErrorResponse;

    // Assert
    expect(removeMemberRequest.status).toBe(500);
    expect(removeMemberResponse.message).toBe('Internal server error');
  });

  it("should change member's role", async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    const invitation = {
      inviteeEmail: 'invitee@email.com',
    };

    const createInvitationRequest = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send(invitation);

    const createInvitationResponse =
      createInvitationRequest.body as InviteUserToWorkspaceOutput;

    const acceptInvitationRequest = await request(
      getApp().getHttpServer(),
    ).post(
      `/workspaces/invitations/${createInvitationResponse.invitation.id}/accept`,
    );

    const acceptInvitationResponse =
      acceptInvitationRequest.body as AcceptWorkspaceInvitationOutput;

    // Act
    const role = { role: WorkspaceRole.OWNER };
    const changeMemberRoleRequest = await request(getApp().getHttpServer())
      .patch(
        `/workspaces/${workspace.id}/members/${acceptInvitationResponse.invitation.userId}`,
      )
      .send(role);

    const changeMemberRoleResponse =
      changeMemberRoleRequest.body as ChangeWorkspaceMemberRoleOutput;

    // Assert
    expect(changeMemberRoleRequest.status).toBe(200);
    expect(changeMemberRoleResponse.userId).toBe(
      acceptInvitationResponse.invitation.userId,
    );
    expect(changeMemberRoleResponse.workspaceId).toBe(workspace.id);
    expect(changeMemberRoleResponse.role).toBe(role.role);
  });

  it('should return en error if the member does not belong to the workspace', async () => {
    // Arrange
    const workspace = await createWorkspace(getApp());

    // Act
    const role = { role: WorkspaceRole.OWNER };
    const userToFail = 'user-to-fail';
    const changeMemberRoleRequest = await request(getApp().getHttpServer())
      .patch(`/workspaces/${workspace.id}/members/${userToFail}`)
      .send(role);

    const changeMemberRoleResponse =
      changeMemberRoleRequest.body as ErrorResponse;

    // Arrange
    expect(changeMemberRoleRequest.status).toBe(500);
    expect(changeMemberRoleResponse.message).toBe('Internal server error');
  });

  it('should return 400 if workspace name is empty', async () => {
    const response = await request(getApp().getHttpServer())
      .post('/workspaces')
      .send({ name: '' });

    expect(response.status).toBe(400);
  });

  it('should return 400 if workspace name is not a string', async () => {
    const response = await request(getApp().getHttpServer())
      .post('/workspaces')
      .send({ name: 123 });

    expect(response.status).toBe(400);
  });

  it('should return 400 if workspace member role is invalid', async () => {
    const workspace = await createWorkspace(getApp());

    const response = await request(getApp().getHttpServer())
      .patch(`/workspaces/${workspace.id}/members/user-id`)
      .send({ role: 'INVALID_ROLE' });

    expect(response.status).toBe(400);
  });

  it('should return 400 if invitee email is invalid', async () => {
    const workspace = await createWorkspace(getApp());

    const response = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send({ inviteeEmail: 'not-an-email' });

    expect(response.status).toBe(400);
  });

  it('should return 400 if invitee email is missing', async () => {
    const workspace = await createWorkspace(getApp());

    const response = await request(getApp().getHttpServer())
      .post(`/workspaces/${workspace.id}/invitations`)
      .send({});

    expect(response.status).toBe(400);
  });

  it('should return 400 if workspace update name is empty', async () => {
    const workspace = await createWorkspace(getApp());

    const response = await request(getApp().getHttpServer())
      .put(`/workspaces/${workspace.id}`)
      .send({ name: '' });

    expect(response.status).toBe(400);
  });

  it('should return 400 if workspace member role is empty', async () => {
    const workspace = await createWorkspace(getApp());

    const response = await request(getApp().getHttpServer())
      .patch(`/workspaces/${workspace.id}/members/user-id`)
      .send({ role: '' });

    expect(response.status).toBe(400);
  });
});
