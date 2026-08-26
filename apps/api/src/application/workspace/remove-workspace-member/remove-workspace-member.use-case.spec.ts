import { InMemoryWorkspaceMembershipRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspaceMembership.repository';
import { RemoveWorkspaceMemberUseCase } from './remove-workspace-member.use-case';
import { WorkspaceMembership } from 'src/domain/workspaceMembership/workspaceMembership.entity';
import { WorkspaceRole } from 'src/domain/workspaceMembership/workspaceRole.enum';
import { RemoveWorkspaceMemberInput } from './remove-workspace-member.input';
import { MembershipNotFoundError } from '../errors/membership-not-found.error';
import { WorkspaceMustHaveOwnerError } from '../errors/workspace-must-have-owner.error';

describe('RemoveWorkspaceMember', () => {
  it('should remove the member from the workspace', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new RemoveWorkspaceMemberUseCase(
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
        WorkspaceRole.MEMBER,
      ),
    );

    // Act
    const output = await useCase.execute({
      workspaceId: 'workspace-1',
      userId: 'user-2',
    });

    // Assert
    expect(output.workspaceId).toBe('workspace-1');
    expect(output.userId).toBe('user-2');

    const membership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'user-2',
      );

    expect(membership).toBeNull();
  });

  it('should throw when the member does not belong to the workspace', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new RemoveWorkspaceMemberUseCase(
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
    const input: RemoveWorkspaceMemberInput = {
      workspaceId: 'workspace-2',
      userId: 'user-1',
    };

    // Act & Assert
    await expect(() => useCase.execute(input)).rejects.toThrow(
      new MembershipNotFoundError(input.userId, input.workspaceId),
    );
  });

  it('should throw when the member to remove is the last owner of the workspace', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const useCase = new RemoveWorkspaceMemberUseCase(
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
    const input: RemoveWorkspaceMemberInput = {
      workspaceId: 'workspace-1',
      userId: 'user-1',
    };

    // Act & Assert
    await expect(() => useCase.execute(input)).rejects.toThrow(
      new WorkspaceMustHaveOwnerError(input.workspaceId),
    );
  });
  it('should remove an owner if there is another owner in the workspace', async () => {
    // Arrange
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();

    const useCase = new RemoveWorkspaceMemberUseCase(
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

    const input: RemoveWorkspaceMemberInput = {
      workspaceId: 'workspace-1',
      userId: 'user-1',
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.workspaceId).toBe('workspace-1');
    expect(output.userId).toBe('user-1');

    const removedMembership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'user-1',
      );

    expect(removedMembership).toBeNull();

    const remainingOwner =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'user-2',
      );

    expect(remainingOwner).not.toBeNull();
    expect(remainingOwner?.role).toBe(WorkspaceRole.OWNER);
  });
});
