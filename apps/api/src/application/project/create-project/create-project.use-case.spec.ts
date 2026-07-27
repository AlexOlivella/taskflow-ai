import { IdGenerator } from 'src/application/shared/id-generator';
import { Workspace } from 'src/domain/workspace/workspace.entity';
import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project.repository';
import { InMemoryWorkspaceRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspace.repository';
import { CreateProjectUseCase } from './create-project.use-case';
import { CreateProjectInput } from './create-project.input';
import { WorkspaceNotFoundError } from 'src/application/workspace/errors/workspace-not-found.error';
import { ProjectNameAlreadyExistsError } from '../errors/project-name-already-exists.error';

describe('CreateProjectUseCase', () => {
  class FakeIdGenerator implements IdGenerator {
    generate(): string {
      return 'project-123';
    }
  }

  it('should create and save a project and return its data', async () => {
    // Arrange

    const workspaceRepository = new InMemoryWorkspaceRepository();
    const projectRepository = new InMemoryProjectRepository();
    const idGenerator = new FakeIdGenerator();

    const workspace = new Workspace('workspace-1', 'Workspace 1');
    await workspaceRepository.save(workspace);

    const useCase = new CreateProjectUseCase(
      projectRepository,
      workspaceRepository,
      idGenerator,
    );

    const input: CreateProjectInput = {
      workspaceId: 'workspace-1',
      name: 'Project 1',
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    const project = await projectRepository.findByWorkspaceIdAndName(
      output.workspaceId,
      output.name,
    );

    expect(output.id).toBe('project-123');

    expect(project).not.toBeNull();
    expect(project?.id).toBe(output.id);
    expect(project?.workspaceId).toBe('workspace-1');
    expect(project?.name).toBe('Project 1');
  });

  it('should throw when workspace does not exist', async () => {
    // Arrange
    const workspaceRepository = new InMemoryWorkspaceRepository();
    const projectRepository = new InMemoryProjectRepository();
    const idGenerator = new FakeIdGenerator();

    const useCase = new CreateProjectUseCase(
      projectRepository,
      workspaceRepository,
      idGenerator,
    );

    const input: CreateProjectInput = {
      workspaceId: 'workspace-2',
      name: 'Project 1',
    };

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow(
      WorkspaceNotFoundError,
    );
  });

  it('should throw when project name already exists in the workspace', async () => {
    // Arrange
    const workspaceRepository = new InMemoryWorkspaceRepository();
    const projectRepository = new InMemoryProjectRepository();
    const idGenerator = new FakeIdGenerator();

    const workspace = new Workspace('workspace-1', 'Workspace 1');
    await workspaceRepository.save(workspace);

    const useCase = new CreateProjectUseCase(
      projectRepository,
      workspaceRepository,
      idGenerator,
    );

    const input: CreateProjectInput = {
      workspaceId: 'workspace-1',
      name: 'Project 1',
    };

    await useCase.execute(input);

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow(
      ProjectNameAlreadyExistsError,
    );
  });
});
