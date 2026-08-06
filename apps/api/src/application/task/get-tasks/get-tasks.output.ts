import { TaskStatus } from 'src/domain/task/task-status.enum';

export interface TaskResponse {
  id: string;
  workspaceId: string;
  projectId: string | null;
  assigneeId: string | null;
  name: string;
  status: TaskStatus;
}

export interface GetTasksOutput {
  tasks: TaskResponse[];
}
