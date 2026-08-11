import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

export class ChangeWorkspaceMemberRoleRequest {
  role!: WorkspaceRole;
}
