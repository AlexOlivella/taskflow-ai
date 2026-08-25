import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
