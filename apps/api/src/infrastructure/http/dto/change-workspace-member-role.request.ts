import { IsEnum } from 'class-validator';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

export class ChangeWorkspaceMemberRoleRequest {
  @IsEnum(WorkspaceRole)
  role!: WorkspaceRole;
}
