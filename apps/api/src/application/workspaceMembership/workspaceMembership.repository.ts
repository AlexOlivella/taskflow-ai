import { WorkspaceMembership } from 'src/domain/workspaceMembership/workspaceMembership.entity';

export const WORKSPACEMEMBERSHIP_REPOSITORY = Symbol(
  'WORKSPACEMEMBERSHIP_REPOSITORY',
);

export interface WorkspaceMembershipRepository {
  save(workspaceMembership: WorkspaceMembership): Promise<void>;
  findByWorkspaceIdAndUserId(
    workspaceId: string,
    memberId: string,
  ): Promise<WorkspaceMembership | null>;
}
