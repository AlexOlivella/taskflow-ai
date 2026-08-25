import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWorkspaceRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
