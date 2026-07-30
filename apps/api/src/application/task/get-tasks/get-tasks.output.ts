export interface TaskResponse {
  id: string;
  workspaceId: string;
  projectId: string | null;
  name: string;
}

export interface GetTasksOutput {
  tasks: TaskResponse[];
}
