import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
