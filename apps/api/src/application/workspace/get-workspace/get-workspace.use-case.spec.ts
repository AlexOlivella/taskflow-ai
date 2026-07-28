import { InMemoryWorkspaceRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspace.repository';
import { Workspace } from 'src/domain/workspace/workspace.entity';
import { GetWorkspaceUseCase } from './get-workspace.use-case';
import { WorkspaceNotFoundError } from '../errors/workspace-not-found.error';

describe('GetWorkspaceUseCase', () => {
  it('should return the workspace', async () => {
    // Arrange

    const repository = new InMemoryWorkspaceRepository();
    await repository.save(new Workspace('workspace-1', 'Workspace 1'));

    // Act
    const useCase = new GetWorkspaceUseCase(repository);

    const output = await useCase.execute({
      id: 'workspace-1',
    });

    // Assert
    expect(output.workspace.id).toBe('workspace-1');
    expect(output.workspace.name).toBe('Workspace 1');
  });

  it('should throw when workspace does not exist', async () => {
    // Arrange
    const repository = new InMemoryWorkspaceRepository();
    const useCase = new GetWorkspaceUseCase(repository);

    // Act & Assert
    await expect(useCase.execute({ id: 'workspace-2' })).rejects.toThrow(
      WorkspaceNotFoundError,
    );
  });
});
