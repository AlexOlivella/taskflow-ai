import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACEMEMBERSHIP_REPOSITORY,
  type WorkspaceMembershipRepository,
} from 'src/application/workspaceMembership/workspaceMembership.repository';
import { RemoveWorkspaceMemberInput } from './remove-workspace-member.input';
import { RemoveWorkspaceMemberOutput } from './remove-workspace-member.output';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';
import { WorkspaceMustHaveOwnerError } from '../errors/workspace-must-have-owner.error';
import { MembershipNotFoundError } from '../errors/membership-not-found.error';

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
      throw new MembershipNotFoundError(input.userId, input.workspaceId);
    }

    const memberships =
      await this.workspaceMembershipRepository.findByWorkspaceId(
        input.workspaceId,
      );

    const owners = memberships.filter(
      (membershipItem) => membershipItem.role === WorkspaceRole.OWNER,
    );

    if (membership.role === WorkspaceRole.OWNER && owners.length === 1) {
      throw new WorkspaceMustHaveOwnerError(membership.workspaceId);
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
