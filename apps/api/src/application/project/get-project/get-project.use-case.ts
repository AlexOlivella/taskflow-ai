import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from '../project.repository';
import { GetProjectInput } from './get-project.input';
import { ProjectNotFoundError } from '../errors/project-not-found.error';
import { GetProjectOutput } from './get-project.output';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(input: GetProjectInput): Promise<GetProjectOutput> {
    const project = await this.projectRepository.findById(input.id);

    if (!project) {
      throw new ProjectNotFoundError(input.id);
    }

    return {
      project: {
        id: project.id,
        workspaceId: project.workspaceId,
        name: project.name,
      },
    };
  }
}
