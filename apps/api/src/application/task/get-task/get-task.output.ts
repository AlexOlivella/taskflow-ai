export interface GetTaskOutput {
  id: string;
  workspaceId: string;
  projectId: string | null;
  assigneeId: string | null;
  name: string;
}
