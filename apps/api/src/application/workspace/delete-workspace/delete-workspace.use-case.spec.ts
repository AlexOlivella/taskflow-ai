import { Workspace } from 'src/domain/workspace/workspace.entity';
import { InMemoryWorkspaceRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspace.repository';
import { DeleteWorkspaceUseCase } from './delete-workspace.use-case';
import { WorkspaceNotFoundError } from '../errors/workspace-not-found.error';

describe('DeleteWorkspaceUseCase', () => {
  it('should delete the workspace', async () => {
    // Arrange
    const repository = new InMemoryWorkspaceRepository();
    await repository.save(new Workspace('workspace-1', 'Workspace 1'));
    const useCase = new DeleteWorkspaceUseCase(repository);

    // Act
    await useCase.execute({ id: 'workspace-1' });

    // Assert
    const workspace = await repository.findById('workspace-1');
    expect(workspace).toBeNull();
  });
  it('should throw when workspace does not exist', async () => {
    // Arrange
    const repository = new InMemoryWorkspaceRepository();
    const useCase = new DeleteWorkspaceUseCase(repository);

    // Act & Assert
    await expect(useCase.execute({ id: 'workspace-2' })).rejects.toThrow(
      WorkspaceNotFoundError,
    );
  });
});
