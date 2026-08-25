import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
