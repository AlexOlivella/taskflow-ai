import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

export interface ChangeWorkspaceMemberRoleOutput {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
}
