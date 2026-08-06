export interface TaskResponse {
  id: string;
  workspaceId: string;
  projectId: string | null;
  assigneeId: string | null;
  name: string;
}

export interface GetTasksOutput {
  tasks: TaskResponse[];
}
