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

  findByWorkspaceId(workspaceId: string): Promise<WorkspaceMembership[]> {
    return Promise.resolve(
      this.workspaceMemberships.filter(
        (workspaceMembershipItem) =>
          workspaceMembershipItem.workspaceId === workspaceId,
      ),
    );
  }

  delete(workspaceId: string, memberId: string): Promise<void> {
    const workspaceMembershipPosition = this.workspaceMemberships.findIndex(
      (workspaceMembershipItem) =>
        workspaceMembershipItem.workspaceId === workspaceId &&
        workspaceMembershipItem.userId === memberId,
    );

    if (workspaceMembershipPosition === -1) {
      return Promise.resolve();
    }

    this.workspaceMemberships.splice(workspaceMembershipPosition, 1);

    return Promise.resolve();
  }
}
