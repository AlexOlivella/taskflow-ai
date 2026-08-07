import { Invitation } from './invitation.entity';
import { InvitationStatus } from './invitationStatus.enum';

describe('Invitation', () => {
  it('should create an invitation with PENDING status by default', () => {
    const createdAt = new Date();
    const invitation = new Invitation(
      'invitation-1',
      'workspace-1',
      'inviter-1',
      'user@user.com',
      createdAt,
    );
    expect(invitation.id).toBe('invitation-1');
    expect(invitation.workspaceId).toBe('workspace-1');
    expect(invitation.inviterId).toBe('inviter-1');
    expect(invitation.inviteeEmail).toBe('user@user.com');
    expect(invitation.createdAt).toBe(createdAt);
    expect(invitation.status).toBe(InvitationStatus.PENDING);
  });

  it('should throw when invitee email is empty', () => {
    const createdAt = new Date();
    expect(
      () =>
        new Invitation(
          'invitation-1',
          'workspace-1',
          'inviter-1',
          '',
          createdAt,
        ),
    ).toThrow('Invitee email cannot be empty.');
  });

  it('should throw when invitee email contains only spaces', () => {
    const createdAt = new Date();
    expect(
      () =>
        new Invitation(
          'invitation-1',
          'workspace-1',
          'inviter-1',
          '             ',
          createdAt,
        ),
    ).toThrow('Invitee email cannot be empty.');
  });
  it('should normalize invitee email', () => {
    const createdAt = new Date();
    const invitation = new Invitation(
      'invitation-1',
      'workspace-1',
      'inviter-1',
      '           user@user.com              ',
      createdAt,
    );

    expect(invitation.inviteeEmail).toBe('user@user.com');
  });

  it('should accept an invitation', () => {
    const createdAt = new Date();
    const invitation = new Invitation(
      'invitation-1',
      'workspace-1',
      'inviter-1',
      'user@user.com',
      createdAt,
    );

    invitation.accept();

    expect(invitation.status).toBe(InvitationStatus.ACCEPTED);
  });

  it('should reject an invitation', () => {
    const createdAt = new Date();
    const invitation = new Invitation(
      'invitation-1',
      'workspace-1',
      'inviter-1',
      'user@user.com',
      createdAt,
    );

    invitation.reject();

    expect(invitation.status).toBe(InvitationStatus.REJECTED);
  });
});
