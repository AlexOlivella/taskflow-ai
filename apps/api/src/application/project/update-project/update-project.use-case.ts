import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from '../project.repository';
import { UpdateProjectInput } from './update-project.input';
import { UpdateProjectOutput } from './update-project.output';
import { ProjectNotFoundError } from '../errors/project-not-found.error';
import { ProjectNameAlreadyExistsError } from '../errors/project-name-already-exists.error';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(input: UpdateProjectInput): Promise<UpdateProjectOutput> {
    const project = await this.projectRepository.findById(input.id);
    if (!project) {
      throw new ProjectNotFoundError(input.id);
    }

    const existingProject =
      await this.projectRepository.findByWorkspaceIdAndName(
        project.workspaceId,
        input.name,
      );

    if (existingProject && existingProject.id !== project.id) {
      throw new ProjectNameAlreadyExistsError(project.workspaceId, input.name);
    }

    project.rename(input.name);
    await this.projectRepository.save(project);

    return {
      id: project.id,
      workspaceId: project.workspaceId,
      name: project.name,
    };
  }
}
