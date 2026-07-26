export interface WorkspaceResponse {
  id: string;
  name: string;
}

export interface GetWorkspacesOutput {
  workspaces: WorkspaceResponse[];
}
