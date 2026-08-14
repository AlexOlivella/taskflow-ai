import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';

export interface AcceptWorkspaceInvitationResponse {
  id: string;
  inviterId: string;
  inviteeEmail: string;
  status: InvitationStatus;
  userId: string;
}

export interface AcceptWorkspaceInvitationOutput {
  invitation: AcceptWorkspaceInvitationResponse;
}
