export const INVITATION_SENDER = Symbol('INVITATION_SENDER');

export interface InvitationSender {
  sendInvitation(inviteeEmail: string, invitationId: string): Promise<void>;
}
