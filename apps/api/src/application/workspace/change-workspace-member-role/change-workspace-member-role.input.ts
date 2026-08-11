import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

export interface ChangeWorkspaceMemberRoleInput {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
}
