import { Workspace } from 'src/domain/workspace/workspace.entity';
import { InMemoryWorkspaceRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspace.repository';
import { GetWorkspacesUseCase } from './get-workspaces.use-case';

describe('GetWorkspacesUseCase', () => {
  it('should return all workspaces', async () => {
    const workspaceRepository = new InMemoryWorkspaceRepository();

    await workspaceRepository.save(new Workspace('workspace-1', 'Workspace 1'));
    await workspaceRepository.save(new Workspace('workspace-2', 'Workspace 2'));

    const useCase = new GetWorkspacesUseCase(workspaceRepository);

    const output = await useCase.execute();

    expect(output.workspaces).toHaveLength(2);

    expect(output.workspaces[0].id).toBe('workspace-1');
    expect(output.workspaces[0].name).toBe('Workspace 1');

    expect(output.workspaces[1].id).toBe('workspace-2');
    expect(output.workspaces[1].name).toBe('Workspace 2');
  });

  it('should return an empty list when there are no workspaces', async () => {
    const workspaceRepository = new InMemoryWorkspaceRepository();

    const useCase = new GetWorkspacesUseCase(workspaceRepository);

    const output = await useCase.execute();

    expect(output.workspaces).toHaveLength(0);
  });
});
