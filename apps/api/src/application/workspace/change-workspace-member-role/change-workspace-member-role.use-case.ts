import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACEMEMBERSHIP_REPOSITORY,
  type WorkspaceMembershipRepository,
} from 'src/application/workspaceMembership/workspaceMembership.repository';
import { ChangeWorkspaceMemberRoleInput } from './change-workspace-member-role.input';
import { ChangeWorkspaceMemberRoleOutput } from './change-workspace-member-role.output';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

@Injectable()
export class ChangeWorkspaceMemberRoleUseCase {
  constructor(
    @Inject(WORKSPACEMEMBERSHIP_REPOSITORY)
    private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
  ) {}

  async execute(
    input: ChangeWorkspaceMemberRoleInput,
  ): Promise<ChangeWorkspaceMemberRoleOutput> {
    const workspaceMembership =
      await this.workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        input.workspaceId,
        input.userId,
      );

    if (!workspaceMembership) {
      throw new Error(
        `User ${input.userId} does not belong to the workspace ${input.workspaceId}`,
      );
    }

    const memberships =
      await this.workspaceMembershipRepository.findByWorkspaceId(
        input.workspaceId,
      );

    const owners = memberships.filter(
      (membershipItem) => membershipItem.role === WorkspaceRole.OWNER,
    );
    if (
      workspaceMembership.role === WorkspaceRole.OWNER &&
      input.role === WorkspaceRole.MEMBER &&
      owners.length === 1
    ) {
      throw new Error(
        `The workspace ${input.workspaceId} must have at least 1 Owner`,
      );
    }

    workspaceMembership.changeRole(input.role);

    await this.workspaceMembershipRepository.save(workspaceMembership);

    return {
      workspaceId: workspaceMembership.workspaceId,
      userId: workspaceMembership.userId,
      role: workspaceMembership.role,
    };
  }
}
