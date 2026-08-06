import { TaskStatus } from 'src/domain/task/task-status.enum';

export interface ChangeTaskStatusInput {
  id: string;
  status: TaskStatus;
}
