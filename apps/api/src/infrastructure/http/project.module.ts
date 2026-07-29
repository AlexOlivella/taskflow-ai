import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { CreateProjectUseCase } from 'src/application/project/create-project/create-project.use-case';
import { ID_GENERATOR } from 'src/application/shared/id-generator';
import { UuidIdGenerator } from '../ids/uuid-id-generator';
import { PROJECT_REPOSITORY } from 'src/application/project/project.repository';
import { InMemoryProjectRepository } from '../persistence/in-memory/in-memory-project.repository';
import { WorkspaceModule } from './workspace.module';
import { UpdateProjectUseCase } from 'src/application/project/update-project/update-project.use-case';
import { DeleteProjectUseCase } from 'src/application/project/delete-project/delete-project.use-case';
import { GetProjectsUseCase } from 'src/application/project/get-projects/get-projects.use-case';

@Module({
  imports: [WorkspaceModule],
  controllers: [ProjectController],
  providers: [
    // Use cases
    CreateProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
    GetProjectsUseCase,

    // Infraestructure
    {
      provide: PROJECT_REPOSITORY,
      useClass: InMemoryProjectRepository,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidIdGenerator,
    },
  ],
})
export class ProjectModule {}
