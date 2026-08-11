import { Module } from '@nestjs/common';
import { WorkspaceController } from './controllers/workspace.controller';
import { CreateWorkspaceUseCase } from 'src/application/workspace/create-workspace/create-workspace.use-case';
import { WORKSPACE_REPOSITORY } from 'src/application/workspace/workspace.repository';
import { InMemoryWorkspaceRepository } from '../persistence/in-memory/in-memory-workspace.repository';
import { ID_GENERATOR } from 'src/application/shared/id-generator';
import { UuidIdGenerator } from '../ids/uuid-id-generator';
import { GetWorkspacesUseCase } from 'src/application/workspace/get-workspaces/get-workspaces.use-case';
import { GetWorkspaceUseCase } from 'src/application/workspace/get-workspace/get-workspace.use-case';
import { UpdateWorkspaceUseCase } from 'src/application/workspace/update-workspace/update-workspace.use-case';
import { DeleteWorkspaceUseCase } from 'src/application/workspace/delete-workspace/delete-workspace.use-case';
import { InviteUserToWorkspaceUseCase } from 'src/application/workspace/invite-user-to-workspace/inviteUserToWorkspace.use-case';
import { USER_REPOSITORY } from 'src/application/user/user.repository';
import { InMemoryUserRepository } from '../persistence/in-memory/in-memory-user.repository';
import { INVITATION_REPOSITORY } from 'src/application/invitation/invitation.repository';
import { InMemoryInvitationRepository } from '../persistence/in-memory/in-memory-invitation.repository';
import { WORKSPACEMEMBERSHIP_REPOSITORY } from 'src/application/workspaceMembership/workspaceMembership.repository';
import { INVITATION_SENDER } from 'src/application/workspace/invite-user-to-workspace/invitation.sender';
import { InMemoryInvitationSender } from '../persistence/in-memory/in-memory-invitation.sender';
import { InMemoryWorkspaceMembershipRepository } from '../persistence/in-memory/in-memory-workspaceMembership.repository';
import { AcceptWorkspaceInvitationUseCase } from 'src/application/workspace/accept-workspace-invitation/accept-workspace-invitation.use-case';
import { RemoveWorkspaceMemberUseCase } from 'src/application/workspace/remove-workspace-member/remove-workspace-member.use-case';
import { ChangeWorkspaceMemberRoleUseCase } from 'src/application/workspace/change-workspace-member-role/change-workspace-member-role.use-case';

@Module({
  controllers: [WorkspaceController],
  providers: [
    // Use Cases
    CreateWorkspaceUseCase,
    GetWorkspacesUseCase,
    GetWorkspaceUseCase,
    UpdateWorkspaceUseCase,
    DeleteWorkspaceUseCase,
    InviteUserToWorkspaceUseCase,
    AcceptWorkspaceInvitationUseCase,
    RemoveWorkspaceMemberUseCase,
    ChangeWorkspaceMemberRoleUseCase,

    // Infrastructure
    {
      provide: WORKSPACE_REPOSITORY,
      useClass: InMemoryWorkspaceRepository,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidIdGenerator,
    },
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
    {
      provide: INVITATION_REPOSITORY,
      useClass: InMemoryInvitationRepository,
    },
    {
      provide: WORKSPACEMEMBERSHIP_REPOSITORY,
      useClass: InMemoryWorkspaceMembershipRepository,
    },
    {
      provide: INVITATION_SENDER,
      useClass: InMemoryInvitationSender,
    },
  ],
  exports: [WORKSPACE_REPOSITORY],
})
export class WorkspaceModule {}
