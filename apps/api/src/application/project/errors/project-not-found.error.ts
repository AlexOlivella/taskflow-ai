export class ProjectNotFoundError extends Error {
  constructor(projectId: string) {
    super(`Project "${projectId}" was not found.`);
    this.name = ProjectNotFoundError.name;
  }
}
