import { Invitation } from 'src/domain/invitation/invitation.entity';

export const INVITATION_REPOSITORY = Symbol('INVITATION_REPOSITORY');

export interface InvitationRepository {
  save(invitation: Invitation): Promise<void>;
  findPendingInvitationByWorkspaceEmail(
    workspaceId: string,
    inviteeEmail: string,
  ): Promise<Invitation | null>;
}
