import { Module } from '@nestjs/common';
import { WorkspaceController } from './controllers/workspace.controller';
import { CreateWorkspaceUseCase } from 'src/application/workspace/create-workspace/create-workspace.use-case';
import { WORKSPACE_REPOSITORY } from 'src/application/workspace/workspace.repository';
import { InMemoryWorkspaceRepository } from '../persistence/in-memory/in-memory-workspace.repository';
import { ID_GENERATOR } from 'src/application/shared/id-generator';
import { UuidIdGenerator } from '../ids/uuid-id-generator';
import { GetWorkspacesUseCase } from 'src/application/workspace/get-workspaces/get-workspaces.use-case';
import { GetWorkspaceUseCase } from 'src/application/workspace/get-workspace/get-workspace.use-case';
import { UpdateWorkspaceUseCase } from 'src/application/workspace/update-workspace/update-workspace.use-case';
import { DeleteWorkspaceUseCase } from 'src/application/workspace/delete-workspace/delete-workspace.use-case';

@Module({
  controllers: [WorkspaceController],
  providers: [
    // Use Cases
    CreateWorkspaceUseCase,
    GetWorkspacesUseCase,
    GetWorkspaceUseCase,
    UpdateWorkspaceUseCase,
    DeleteWorkspaceUseCase,

    // Infrastructure
    {
      provide: WORKSPACE_REPOSITORY,
      useClass: InMemoryWorkspaceRepository,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidIdGenerator,
    },
  ],
})
export class WorkspaceModule {}
