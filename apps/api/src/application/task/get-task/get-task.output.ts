import { TaskStatus } from 'src/domain/task/task-status.enum';

export interface GetTaskOutput {
  id: string;
  workspaceId: string;
  projectId: string | null;
  assigneeId: string | null;
  name: string;
  status: TaskStatus;
}
