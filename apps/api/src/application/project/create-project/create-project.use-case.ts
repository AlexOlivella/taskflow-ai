import { Inject, Injectable } from '@nestjs/common';
import {
  ID_GENERATOR,
  type IdGenerator,
} from 'src/application/shared/id-generator';
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from '../project.repository';
import { CreateProjectOutput } from './create-project.output';
import { CreateProjectInput } from './create-project.input';
import { Project } from 'src/domain/project/project.entity';
import {
  WORKSPACE_REPOSITORY,
  type WorkspaceRepository,
} from 'src/application/workspace/workspace.repository';
import { WorkspaceNotFoundError } from 'src/application/workspace/errors/workspace-not-found.error';
import { ProjectNameAlreadyExistsError } from '../errors/project-name-already-exists.error';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,

    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: WorkspaceRepository,

    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(input: CreateProjectInput): Promise<CreateProjectOutput> {
    const workspace = await this.workspaceRepository.findById(
      input.workspaceId,
    );
    if (!workspace) {
      throw new WorkspaceNotFoundError(input.workspaceId);
    }

    const existingProject =
      await this.projectRepository.findByWorkspaceIdAndName(
        input.workspaceId,
        input.name,
      );
    if (existingProject) {
      throw new ProjectNameAlreadyExistsError(input.workspaceId, input.name);
    }

    const projectId = this.idGenerator.generate();

    const project = new Project(projectId, input.workspaceId, input.name);

    await this.projectRepository.save(project);

    return {
      id: project.id,
      workspaceId: project.workspaceId,
      name: project.name,
    };
  }
}
