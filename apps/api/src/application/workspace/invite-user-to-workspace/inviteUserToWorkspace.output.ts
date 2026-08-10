import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';

export interface InviteUserToWorkspaceResponse {
  id: string;
  inviterId: string;
  inviteeEmail: string;
  status: InvitationStatus;
}

export interface InviteUserToWorkspaceOutput {
  invitation: InviteUserToWorkspaceResponse;
}
