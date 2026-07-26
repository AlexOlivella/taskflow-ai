import { IdGenerator } from 'src/application/shared/id-generator';
import { Workspace } from 'src/domain/workspace/workspace.entity';
import { WorkspaceRepository } from '../workspace.repository';
import { CreateWorkspaceUseCase } from './create-workspace.use-case';
import { CreateWorkspaceInput } from './create-workspace.input';

describe('CreateWorkspaceUseCase', () => {
  class FakeIdGenerator implements IdGenerator {
    generate(): string {
      return 'workspace-123';
    }
  }

  class InMemoryWorkspaceRepository implements WorkspaceRepository {
    private readonly workspaces: Workspace[] = [];

    save(workspace: Workspace): Promise<void> {
      this.workspaces.push(workspace);
      return Promise.resolve();
    }

    getWorkspaces(): Workspace[] {
      return this.workspaces;
    }
  }
  it('should create and save a workspace and return its id', async () => {
    // Arrange
    const workspaceRepository = new InMemoryWorkspaceRepository();
    const idGenerator = new FakeIdGenerator();

    const useCase = new CreateWorkspaceUseCase(
      workspaceRepository,
      idGenerator,
    );

    const input: CreateWorkspaceInput = {
      name: 'TaskFlow AI',
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    const workspace = workspaceRepository.getWorkspaces()[0];

    expect(output.id).toBe('workspace-123');
    expect(workspaceRepository.getWorkspaces()).toHaveLength(1);

    expect(workspace.id).toBe('workspace-123');
    expect(workspace.name).toBe('TaskFlow AI');
  });
});
