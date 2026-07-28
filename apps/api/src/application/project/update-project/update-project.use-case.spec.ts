import { Project } from 'src/domain/project/project.entity';
import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project.repository';
import { UpdateProjectUseCase } from './update-project.use-case';
import { UpdateProjectInput } from './update-project.input';
import { ProjectNotFoundError } from '../errors/project-not-found.error';
import { ProjectNameAlreadyExistsError } from '../errors/project-name-already-exists.error';

describe('UpdateProjectUseCase', () => {
  it('should update a project', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new UpdateProjectUseCase(projectRepository);

    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );
    const input: UpdateProjectInput = {
      id: 'project-1',
      name: 'Project updated',
    };
    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.id).toBe('project-1');
    expect(output.workspaceId).toBe('workspace-1');
    expect(output.name).toBe('Project updated');

    const updatedProject = await projectRepository.findById('project-1');
    expect(updatedProject).not.toBeNull();
    expect(updatedProject?.id).toBe('project-1');
    expect(updatedProject?.workspaceId).toBe('workspace-1');
    expect(updatedProject?.name).toBe('Project updated');
  });

  it('should throw when project does not exist', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new UpdateProjectUseCase(projectRepository);

    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );
    const input: UpdateProjectInput = {
      id: 'project-2',
      name: 'Project updated',
    };
    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow(ProjectNotFoundError);
  });

  it('should throw when another project with the same name exists in the workspace', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new UpdateProjectUseCase(projectRepository);

    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );
    await projectRepository.save(
      new Project('project-2', 'workspace-1', 'Project 2'),
    );
    const input: UpdateProjectInput = {
      id: 'project-2',
      name: 'Project 1',
    };
    // Act & Assert

    await expect(useCase.execute(input)).rejects.toThrow(
      ProjectNameAlreadyExistsError,
    );
  });
});
