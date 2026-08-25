import { IsOptional, IsString } from 'class-validator';

export class AssignTaskRequest {
  @IsOptional()
  @IsString()
  assigneeId!: string | null;
}
