import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACE_REPOSITORY,
  type WorkspaceRepository,
} from '../workspace.repository';
import { DeleteWorkspaceOutput } from './delete-workspace.output';
import { DeleteWorkspaceInput } from './delete-workspace.input';
import { WorkspaceNotFoundError } from '../errors/workspace-not-found.error';

@Injectable()
export class DeleteWorkspaceUseCase {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(input: DeleteWorkspaceInput): Promise<DeleteWorkspaceOutput> {
    const workspace = await this.workspaceRepository.findById(input.id);

    if (!workspace) {
      throw new WorkspaceNotFoundError(input.id);
    }

    await this.workspaceRepository.delete(input.id);

    return {
      id: workspace.id,
    };
  }
}
