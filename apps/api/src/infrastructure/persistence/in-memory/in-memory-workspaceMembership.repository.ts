import { WorkspaceMembershipRepository } from 'src/application/workspaceMembership/workspaceMembership.repository';
import { WorkspaceMembership } from 'src/domain/workspaceMembership/workspaceMembership.entity';

export class InMemoryWorkspaceMembershipRepository implements WorkspaceMembershipRepository {
  private readonly workspaceMemberships: WorkspaceMembership[] = [];

  save(workspaceMembership: WorkspaceMembership): Promise<void> {
    const workspaceMembershipIndex = this.workspaceMemberships.findIndex(
      (workspaceMembershipItem) =>
        workspaceMembershipItem.id === workspaceMembership.id,
    );

    if (workspaceMembershipIndex === -1) {
      this.workspaceMemberships.push(workspaceMembership);
    } else {
      this.workspaceMemberships[workspaceMembershipIndex] = workspaceMembership;
    }
    return Promise.resolve();
  }

  findByWorkspaceIdAndUserId(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMembership | null> {
    return Promise.resolve(
      this.workspaceMemberships.find(
        (workspaceMembership) =>
          workspaceMembership.workspaceId === workspaceId &&
          workspaceMembership.userId === userId,
      ) ?? null,
    );
  }
}
