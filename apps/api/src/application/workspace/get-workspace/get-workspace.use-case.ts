import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACE_REPOSITORY,
  type WorkspaceRepository,
} from '../workspace.repository';
import { GetWorkspaceOutput } from './get-workspace.output';
import { GetWorkspaceInput } from './get-workspace.input';
import { WorkspaceNotFoundError } from '../errors/workspace-not-found.error';

@Injectable()
export class GetWorkspaceUseCase {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(input: GetWorkspaceInput): Promise<GetWorkspaceOutput> {
    const workspace = await this.workspaceRepository.findById(input.id);
    if (!workspace) {
      throw new WorkspaceNotFoundError(input.id);
    }
    return {
      workspace: {
        id: workspace.id,
        name: workspace.name,
      },
    };
  }
}
