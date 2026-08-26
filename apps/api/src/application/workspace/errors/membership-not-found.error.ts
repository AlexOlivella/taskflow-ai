export class MembershipNotFoundError extends Error {
  constructor(
    public readonly userId: string,
    public readonly workspaceId: string,
  ) {
    super(
      `There is no membership for user ${userId} in workspace ${workspaceId}`,
    );
    this.name = MembershipNotFoundError.name;
  }
}
