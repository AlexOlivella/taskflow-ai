export interface CreateTaskInput {
  workspaceId: string;
  projectId: string | null;
  assigneeId: string | null;
  name: string;
}
