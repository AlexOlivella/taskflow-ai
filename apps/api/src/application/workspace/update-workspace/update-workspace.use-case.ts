import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACE_REPOSITORY,
  type WorkspaceRepository,
} from '../workspace.repository';
import { UpdateWorkspaceOutput } from './update-workspace.output';
import { UpdateWorkspaceInput } from './update-workspace.input';
import { WorkspaceNotFoundError } from '../errors/workspace-not-found.error';

@Injectable()
export class UpdateWorkspaceUseCase {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(input: UpdateWorkspaceInput): Promise<UpdateWorkspaceOutput> {
    const workspace = await this.workspaceRepository.findById(input.id);
    if (!workspace) {
      throw new WorkspaceNotFoundError(input.id);
    }

    workspace.rename(input.name);
    await this.workspaceRepository.save(workspace);
    return {
      workspace: {
        id: workspace.id,
        name: workspace.name,
      },
    };
  }
}
