import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/domain/task/task-status.enum';

export class ChangeTaskStatusRequest {
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
