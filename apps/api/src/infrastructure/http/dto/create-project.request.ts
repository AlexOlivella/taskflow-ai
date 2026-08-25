import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
