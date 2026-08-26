export class WorkspaceMustHaveOwnerError extends Error {
  constructor(public readonly workspaceId: string) {
    super(
      `The workspace ${workspaceId} must have at least one Owner so you can't remove this member`,
    );
    this.name = WorkspaceMustHaveOwnerError.name;
  }
}
