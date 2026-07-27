export class ProjectNameAlreadyExistsError extends Error {
  constructor(workspaceId: string, projectName: string) {
    super(
      `Project "${projectName}" already exists in workspace "${workspaceId}".`,
    );
    this.name = ProjectNameAlreadyExistsError.name;
  }
}
