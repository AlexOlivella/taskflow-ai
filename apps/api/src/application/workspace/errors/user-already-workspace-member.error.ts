export class UserAlreadyWorkspaceMemberError extends Error {
  constructor(
    public readonly id: string,
    public readonly workspaceId: string,
  ) {
    super(`This user ${id} already belongs to the workspace ${workspaceId}`);
    this.name = UserAlreadyWorkspaceMemberError.name;
  }
}
