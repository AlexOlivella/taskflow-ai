import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACEMEMBERSHIP_REPOSITORY,
  type WorkspaceMembershipRepository,
} from 'src/application/workspaceMembership/workspaceMembership.repository';
import { RemoveWorkspaceMemberInput } from './remove-workspace-member.input';
import { RemoveWorkspaceMemberOutput } from './remove-workspace-member.output';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

@Injectable()
export class RemoveWorkspaceMemberUseCase {
  constructor(
    @Inject(WORKSPACEMEMBERSHIP_REPOSITORY)
    private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
  ) {}

  async execute(
    input: RemoveWorkspaceMemberInput,
  ): Promise<RemoveWorkspaceMemberOutput> {
    const membership =
      await this.workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        input.workspaceId,
        input.userId,
      );

    if (!membership) {
      throw new Error(
        `There is no membership for user ${input.userId} in workspace ${input.workspaceId}`,
      );
    }

    const memberships =
      await this.workspaceMembershipRepository.findByWorkspaceId(
        input.workspaceId,
      );

    const owners = memberships.filter(
      (membershipItem) => membershipItem.role === WorkspaceRole.OWNER,
    );

    if (membership.role === WorkspaceRole.OWNER && owners.length === 1) {
      throw new Error(
        `The workspace ${membership.workspaceId} must have at least one Owner so you can't remove this member`,
      );
    }

    await this.workspaceMembershipRepository.delete(
      input.workspaceId,
      input.userId,
    );

    return {
      workspaceId: input.workspaceId,
      userId: input.userId,
    };
  }
}
