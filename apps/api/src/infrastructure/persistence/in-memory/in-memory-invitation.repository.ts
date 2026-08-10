import { InvitationRepository } from 'src/application/invitation/invitation.repository';
import { Invitation } from 'src/domain/invitation/invitation.entity';
import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';

export class InMemoryInvitationRepository implements InvitationRepository {
  private readonly invitations: Invitation[] = [];

  save(invitation: Invitation): Promise<void> {
    const invitationIndex = this.invitations.findIndex(
      (existingInvitation) => existingInvitation.id === invitation.id,
    );

    if (invitationIndex === -1) {
      this.invitations.push(invitation);
    } else {
      this.invitations[invitationIndex] = invitation;
    }

    return Promise.resolve();
  }

  findPendingInvitationByWorkspaceEmail(
    workspaceId: string,
    inviteeEmail: string,
  ): Promise<Invitation | null> {
    return Promise.resolve(
      this.invitations.find(
        (invitation) =>
          invitation.workspaceId === workspaceId &&
          invitation.inviteeEmail === inviteeEmail &&
          invitation.status === InvitationStatus.PENDING,
      ) ?? null,
    );
  }
}
