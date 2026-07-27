import { CreateWorkspaceUseCase } from './create-workspace.use-case';
import { CreateWorkspaceInput } from './create-workspace.input';
import { InMemoryWorkspaceRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspace.repository';
import { IdGenerator } from 'src/application/shared/id-generator';

describe('CreateWorkspaceUseCase', () => {
  class FakeIdGenerator implements IdGenerator {
    generate(): string {
      return 'workspace-123';
    }
  }

  it('should create and save a workspace and return its id', async () => {
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
    const workspace = await workspaceRepository.findById(output.id);

    expect(output.id).toBe('workspace-123');

    expect(workspace).not.toBeNull();
    expect(workspace?.id).toBe(output.id);
    expect(workspace?.name).toBe('TaskFlow AI');
  });
});
