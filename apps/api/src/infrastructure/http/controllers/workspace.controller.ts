import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWorkspaceRequest } from '../dto/create-workspace.request';
import { UpdateWorkspaceRequest } from '../dto/update-workspace.request';
import { CreateWorkspaceOutput } from 'src/application/workspace/create-workspace/create-workspace.output';
import { CreateWorkspaceUseCase } from 'src/application/workspace/create-workspace/create-workspace.use-case';
import { DeleteWorkspaceOutput } from 'src/application/workspace/delete-workspace/delete-workspace.output';
import { DeleteWorkspaceUseCase } from 'src/application/workspace/delete-workspace/delete-workspace.use-case';
import { GetWorkspaceOutput } from 'src/application/workspace/get-workspace/get-workspace.output';
import { GetWorkspaceUseCase } from 'src/application/workspace/get-workspace/get-workspace.use-case';
import { GetWorkspacesOutput } from 'src/application/workspace/get-workspaces/get-workspaces.output';
import { GetWorkspacesUseCase } from 'src/application/workspace/get-workspaces/get-workspaces.use-case';
import { UpdateWorkspaceOutput } from 'src/application/workspace/update-workspace/update-workspace.output';
import { UpdateWorkspaceUseCase } from 'src/application/workspace/update-workspace/update-workspace.use-case';
import { InviteUserToWorkspaceRequest } from '../dto/invite-user-to-workspace.request';
import { InviteUserToWorkspaceOutput } from 'src/application/workspace/invite-user-to-workspace/inviteUserToWorkspace.output';
import { InviteUserToWorkspaceUseCase } from 'src/application/workspace/invite-user-to-workspace/inviteUserToWorkspace.use-case';
import { AcceptWorkspaceInvitationOutput } from 'src/application/workspace/accept-workspace-invitation/accept-workspace-invitation.output';
import { AcceptWorkspaceInvitationUseCase } from 'src/application/workspace/accept-workspace-invitation/accept-workspace-invitation.use-case';
import { RemoveWorkspaceMemberUseCase } from 'src/application/workspace/remove-workspace-member/remove-workspace-member.use-case';
import { RemoveWorkspaceMemberOutput } from 'src/application/workspace/remove-workspace-member/remove-workspace-member.output';
@Controller('workspaces')
export class WorkspaceController {
  constructor(
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
    private readonly getWorkspacesUseCase: GetWorkspacesUseCase,
    private readonly getWorkspaceUseCase: GetWorkspaceUseCase,
    private readonly updateWorkspaceUseCase: UpdateWorkspaceUseCase,
    private readonly deleteWorkspaceUseCase: DeleteWorkspaceUseCase,
    private readonly inviteUserToWorkspaceUseCase: InviteUserToWorkspaceUseCase,
    private readonly acceptWorkspaceInvitationUseCase: AcceptWorkspaceInvitationUseCase,
    private readonly removeWorkspaceMemberUseCase: RemoveWorkspaceMemberUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateWorkspaceRequest): Promise<CreateWorkspaceOutput> {
    return this.createWorkspaceUseCase.execute({
      name: body.name,
    });
  }

  @Get()
  findAll(): Promise<GetWorkspacesOutput> {
    return this.getWorkspacesUseCase.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<GetWorkspaceOutput> {
    return this.getWorkspaceUseCase.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateWorkspaceRequest,
  ): Promise<UpdateWorkspaceOutput> {
    return this.updateWorkspaceUseCase.execute({
      id,
      name: body.name,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteWorkspaceOutput> {
    return this.deleteWorkspaceUseCase.execute({ id });
  }

  @Post(':id/invitations')
  inviteUser(
    @Param('id') workspaceId: string,
    @Body() body: InviteUserToWorkspaceRequest,
  ): Promise<InviteUserToWorkspaceOutput> {
    return this.inviteUserToWorkspaceUseCase.execute({
      workspaceId,
      inviterId: 'user-1',
      inviteeEmail: body.inviteeEmail,
    });
  }

  @Post('invitations/:invitationId/accept')
  acceptInvitation(
    @Param('invitationId') invitationId: string,
  ): Promise<AcceptWorkspaceInvitationOutput> {
    return this.acceptWorkspaceInvitationUseCase.execute({ invitationId });
  }

  @Delete(':workspaceId/members/:userId')
  removeMember(
    @Param('workspaceId') workspaceId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveWorkspaceMemberOutput> {
    return this.removeWorkspaceMemberUseCase.execute({
      workspaceId,
      userId,
    });
  }
}
