import { WorkspaceMembership } from './workspaceMembership.entity';
import { WorkspaceRole } from './workspaceRole.enum';

describe('WorkspaceMembership', () => {
  it('should create a WorkspaceMembership with MEMBER role by default', () => {
    const workspaceMembership = new WorkspaceMembership(
      'wm-1',
      'workspace-1',
      'user-1',
    );

    expect(workspaceMembership.id).toBe('wm-1');
    expect(workspaceMembership.workspaceId).toBe('workspace-1');
    expect(workspaceMembership.userId).toBe('user-1');
    expect(workspaceMembership.role).toBe(WorkspaceRole.MEMBER);
  });
  it('should create a WorkspaceMembership with OWNER role', () => {
    const workspaceMembership = new WorkspaceMembership(
      'wm-1',
      'workspace-1',
      'user-1',
      WorkspaceRole.OWNER,
    );

    expect(workspaceMembership.id).toBe('wm-1');
    expect(workspaceMembership.workspaceId).toBe('workspace-1');
    expect(workspaceMembership.userId).toBe('user-1');
    expect(workspaceMembership.role).toBe(WorkspaceRole.OWNER);
  });

  it('should change the role', () => {
    const workspaceMembership = new WorkspaceMembership(
      'wm-1',
      'workspace-1',
      'user-1',
      WorkspaceRole.MEMBER,
    );

    workspaceMembership.changeRole(WorkspaceRole.OWNER);

    expect(workspaceMembership.role).toBe(WorkspaceRole.OWNER);
  });
});
