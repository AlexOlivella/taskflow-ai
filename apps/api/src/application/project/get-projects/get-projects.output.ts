export interface ProjectResponse {
  id: string;
  workspaceId: string;
  name: string;
}

export interface GetProjectsOutput {
  projects: ProjectResponse[];
}
