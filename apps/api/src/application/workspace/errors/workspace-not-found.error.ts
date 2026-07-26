export class WorkspaceNotFoundError extends Error {
  constructor(public readonly id: string) {
    super(`Workspace with id "${id}" not found`);
    this.name = WorkspaceNotFoundError.name;
  }
}
