import {
  ID_GENERATOR,
  type IdGenerator,
} from 'src/application/shared/id-generator';
import {
  WORKSPACE_REPOSITORY,
  type WorkspaceRepository,
} from '../workspace.repository';
import { CreateWorkspaceInput } from './create-workspace.input';
import { CreateWorkspaceOutput } from './create-workspace.output';
import { Workspace } from 'src/domain/workspace/workspace.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: WorkspaceRepository,

    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(input: CreateWorkspaceInput): Promise<CreateWorkspaceOutput> {
    const id = this.idGenerator.generate();
    const workspace = new Workspace(id, input.name);
    await this.workspaceRepository.save(workspace);
    return { id };
  }
}
