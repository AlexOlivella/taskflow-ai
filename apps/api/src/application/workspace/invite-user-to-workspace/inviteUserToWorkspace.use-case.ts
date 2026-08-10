import { Inject, Injectable } from '@nestjs/common';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from 'src/application/invitation/invitation.repository';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/application/user/user.repository';
import {
  WORKSPACEMEMBERSHIP_REPOSITORY,
  type WorkspaceMembershipRepository,
} from 'src/application/workspaceMembership/workspaceMembership.repository';
import { InviteUserToWorkspaceOutput } from './inviteUserToWorkspace.output';
import { InviteUserToWorkspaceInput } from './inviteUserToWorkspace.input';
import { Invitation } from 'src/domain/invitation/invitation.entity';
import {
  ID_GENERATOR,
  type IdGenerator,
} from 'src/application/shared/id-generator';
import { INVITATION_SENDER, type InvitationSender } from './invitation.sender';

@Injectable()
export class InviteUserToWorkspaceUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,

    @Inject(WORKSPACEMEMBERSHIP_REPOSITORY)
    private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,

    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,

    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,

    @Inject(INVITATION_SENDER)
    private readonly invitationSender: InvitationSender,
  ) {}

  async execute(
    input: InviteUserToWorkspaceInput,
  ): Promise<InviteUserToWorkspaceOutput> {
    const existingInvitation =
      await this.invitationRepository.findPendingInvitationByWorkspaceEmail(
        input.workspaceId,
        input.inviteeEmail,
      );

    if (existingInvitation) {
      throw new Error(
        `This email ${input.inviteeEmail} is already invited to the workspace ${input.workspaceId}`,
      );
    }

    const inviteeUser = await this.userRepository.findUserByEmail(
      input.inviteeEmail,
    );

    if (inviteeUser) {
      const workspaceMembership =
        await this.workspaceMembershipRepository.findByWorkspaceIdAndUserId(
          input.workspaceId,
          inviteeUser.id,
        );

      if (workspaceMembership) {
        throw new Error(
          `This user ${inviteeUser.id} already belongs to the workspace ${input.workspaceId}`,
        );
      }
    }

    const id = this.idGenerator.generate();

    const invitation = new Invitation(
      id,
      input.workspaceId,
      input.inviterId,
      input.inviteeEmail,
      new Date(),
    );

    await this.invitationRepository.save(invitation);

    await this.invitationSender.sendInvitation(
      invitation.inviteeEmail,
      invitation.id,
    );

    return {
      invitation: {
        id: invitation.id,
        inviterId: invitation.inviterId,
        inviteeEmail: invitation.inviteeEmail,
        status: invitation.status,
      },
    };
  }
}
