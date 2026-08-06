import { TaskStatus } from 'src/domain/task/task-status.enum';

export class ChangeTaskStatusRequest {
  status!: TaskStatus;
}
