import { Inject, Injectable } from '@nestjs/common';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from 'src/application/invitation/invitation.repository';
import { AcceptWorkspaceInvitationInput } from './accept-workspace-invitation.input';
import { AcceptWorkspaceInvitationOutput } from './accept-workspace-invitation.output';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/application/user/user.repository';
import {
  WORKSPACEMEMBERSHIP_REPOSITORY,
  type WorkspaceMembershipRepository,
} from 'src/application/workspaceMembership/workspaceMembership.repository';
import { User } from 'src/domain/user/user.entity';
import { WorkspaceMembership } from 'src/domain/workspaceMembership/workspaceMembership.entity';
import {
  ID_GENERATOR,
  type IdGenerator,
} from 'src/application/shared/id-generator';
import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';

@Injectable()
export class AcceptWorkspaceInvitationUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(WORKSPACEMEMBERSHIP_REPOSITORY)
    private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(
    input: AcceptWorkspaceInvitationInput,
  ): Promise<AcceptWorkspaceInvitationOutput> {
    const invitation = await this.invitationRepository.findById(
      input.invitationId,
    );

    if (!invitation) {
      throw new Error(
        `There is no invitation with this id: ${input.invitationId}`,
      );
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new Error(
        `Invitation ${invitation.id} cannot be accepted because it is not pending.`,
      );
    }

    const existingUser = await this.userRepository.findUserByEmail(
      invitation.inviteeEmail,
    );

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      userId = this.idGenerator.generate();

      await this.userRepository.save(
        new User(userId, 'Temporary User', invitation.inviteeEmail),
      );
    }

    await this.workspaceMembershipRepository.save(
      new WorkspaceMembership(
        this.idGenerator.generate(),
        invitation.workspaceId,
        userId,
      ),
    );

    invitation.accept();

    await this.invitationRepository.save(invitation);

    return {
      invitation: {
        id: invitation.id,
        inviteeEmail: invitation.inviteeEmail,
        inviterId: invitation.inviterId,
        status: invitation.status,
      },
    };
  }
}
