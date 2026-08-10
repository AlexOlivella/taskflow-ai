import { Injectable } from '@nestjs/common';
import { InvitationSender } from 'src/application/workspace/invite-user-to-workspace/invitation.sender';

@Injectable()
export class InMemoryInvitationSender implements InvitationSender {
  sendInvitation(inviteeEmail: string, invitationId: string): Promise<void> {
    console.log(`Invitation ${invitationId} sent to ${inviteeEmail}`);

    return Promise.resolve();
  }
}
