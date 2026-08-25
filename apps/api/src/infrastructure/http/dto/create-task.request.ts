import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskRequest {
  @IsOptional()
  @IsString()
  projectId!: string | null;

  @IsOptional()
  @IsString()
  assigneeId!: string | null;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
