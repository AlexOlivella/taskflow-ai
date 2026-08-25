import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteUserToWorkspaceRequest {
  @IsEmail()
  @IsNotEmpty()
  inviteeEmail!: string;
}
