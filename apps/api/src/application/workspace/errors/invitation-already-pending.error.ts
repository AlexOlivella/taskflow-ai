export class InvitationAlreadyPendingError extends Error {
  constructor(
    public readonly inviteeEmail: string,
    public readonly workspaceId: string,
  ) {
    super(
      `This email ${inviteeEmail} is already invited to the workspace ${workspaceId}`,
    );
    this.name = InvitationAlreadyPendingError.name;
  }
}
