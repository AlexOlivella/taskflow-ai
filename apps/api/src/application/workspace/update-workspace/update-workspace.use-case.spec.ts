import { InMemoryWorkspaceRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspace.repository';
import { UpdateWorkspaceUseCase } from './update-workspace.use-case';
import { WorkspaceNotFoundError } from '../errors/workspace-not-found.error';
import { UpdateWorkspaceInput } from './update-workspace.input';
import { Workspace } from 'src/domain/workspace/workspace.entity';

describe('UpdateWorkspaceUseCase', () => {
  it('should update the workspace', async () => {
    // Arrange
    const repository = new InMemoryWorkspaceRepository();
    await repository.save(new Workspace('workspace-1', 'Workspace 1'));

    const useCase = new UpdateWorkspaceUseCase(repository);
    const input: UpdateWorkspaceInput = {
      id: 'workspace-1',
      name: 'Workspace updated',
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    const workspace = await repository.findById('workspace-1');
    expect(output.workspace.id).toBe('workspace-1');
    expect(output.workspace.name).toBe('Workspace updated');

    expect(workspace?.name).toBe('Workspace updated');
  });

  it('should throw when workspace does not exist', async () => {
    // Arrange
    const repository = new InMemoryWorkspaceRepository();
    const useCase = new UpdateWorkspaceUseCase(repository);

    const input: UpdateWorkspaceInput = {
      id: 'workspace-1',
      name: 'Workspace 1',
    };

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow(
      WorkspaceNotFoundError,
    );
  });
});
