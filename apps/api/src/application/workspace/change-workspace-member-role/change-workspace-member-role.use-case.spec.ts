import { WorkspaceMembership } from 'src/domain/workspaceMembership/workspaceMembership.entity';
import { ChangeWorkspaceMemberRoleUseCase } from './change-workspace-member-role.use-case';
import { InMemoryWorkspaceMembershipRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspaceMembership.repository';
import { ChangeWorkspaceMemberRoleInput } from './change-workspace-member-role.input';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';

describe('ChangeWorkspaceMemberRole', () => {
  it('should change the role MEMBER to OWNER', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new ChangeWorkspaceMemberRoleUseCase(
      workspaceMembershipRepository,
    );

    await workspaceMembershipRepository.save(
      new WorkspaceMembership(
        'wm-1',
        'workspace-1',
        'user-1',
        WorkspaceRole.OWNER,
      ),
    );
    await workspaceMembershipRepository.save(
      new WorkspaceMembership('wm-2', 'workspace-1', 'user-2'),
    );

    const input: ChangeWorkspaceMemberRoleInput = {
      workspaceId: 'workspace-1',
      userId: 'user-2',
      role: WorkspaceRole.OWNER,
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.workspaceId).toBe('workspace-1');
    expect(output.userId).toBe('user-2');
    expect(output.role).toBe(WorkspaceRole.OWNER);

    const membership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'user-2',
      );

    expect(membership).not.toBeNull();
    expect(membership?.role).toBe(WorkspaceRole.OWNER);
  });

  it('should change the role OWNER to MEMBER', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new ChangeWorkspaceMemberRoleUseCase(
      workspaceMembershipRepository,
    );

    await workspaceMembershipRepository.save(
      new WorkspaceMembership(
        'wm-1',
        'workspace-1',
        'user-1',
        WorkspaceRole.OWNER,
      ),
    );

    await workspaceMembershipRepository.save(
      new WorkspaceMembership(
        'wm-2',
        'workspace-1',
        'user-2',
        WorkspaceRole.OWNER,
      ),
    );

    const input: ChangeWorkspaceMemberRoleInput = {
      workspaceId: 'workspace-1',
      userId: 'user-1',
      role: WorkspaceRole.MEMBER,
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.workspaceId).toBe('workspace-1');
    expect(output.userId).toBe('user-1');
    expect(output.role).toBe(WorkspaceRole.MEMBER);

    const membership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'user-1',
      );

    expect(membership).not.toBeNull();
    expect(membership?.role).toBe(WorkspaceRole.MEMBER);
  });

  it('should throw when the workspaceMembership does not exist', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new ChangeWorkspaceMemberRoleUseCase(
      workspaceMembershipRepository,
    );

    const input: ChangeWorkspaceMemberRoleInput = {
      workspaceId: 'workspace-1',
      userId: 'user-1',
      role: WorkspaceRole.MEMBER,
    };

    // Act & Assert
    await expect(() => useCase.execute(input)).rejects.toThrow(
      `User ${input.userId} does not belong to the workspace ${input.workspaceId}`,
    );
  });

  it('should throw when there is only 1 owner and the change is owner to member', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new ChangeWorkspaceMemberRoleUseCase(
      workspaceMembershipRepository,
    );

    await workspaceMembershipRepository.save(
      new WorkspaceMembership(
        'wm-1',
        'workspace-1',
        'user-1',
        WorkspaceRole.OWNER,
      ),
    );

    const input: ChangeWorkspaceMemberRoleInput = {
      workspaceId: 'workspace-1',
      userId: 'user-1',
      role: WorkspaceRole.MEMBER,
    };

    // Act & Assert
    await expect(() => useCase.execute(input)).rejects.toThrow(
      `The workspace ${input.workspaceId} must have at least 1 Owner`,
    );
  });
});
