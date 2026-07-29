import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectOutput } from 'src/application/project/create-project/create-project.output';
import { CreateProjectUseCase } from 'src/application/project/create-project/create-project.use-case';
import { CreateProjectRequest } from '../dto/create-project.request';
import { UpdateProjectOutput } from 'src/application/project/update-project/update-project.output';
import { UpdateProjectUseCase } from 'src/application/project/update-project/update-project.use-case';
import { UpdateProjectRequest } from '../dto/update-project.request';
import { DeleteProjectOutput } from 'src/application/project/delete-project/delete-project.output';
import { DeleteProjectUseCase } from 'src/application/project/delete-project/delete-project.use-case';
import { GetProjectsOutput } from 'src/application/project/get-projects/get-projects.output';
import { GetProjectsUseCase } from 'src/application/project/get-projects/get-projects.use-case';

@Controller('workspaces/:workspaceId/projects')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly getProjectsUseCase: GetProjectsUseCase,
  ) {}

  @Post()
  create(
    @Param('workspaceId') workspaceId: string,
    @Body() body: CreateProjectRequest,
  ): Promise<CreateProjectOutput> {
    return this.createProjectUseCase.execute({
      workspaceId,
      name: body.name,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateProjectRequest,
  ): Promise<UpdateProjectOutput> {
    return this.updateProjectUseCase.execute({
      id,
      name: body.name,
    });
  }

  @Delete(':id') delete(@Param('id') id: string): Promise<DeleteProjectOutput> {
    return this.deleteProjectUseCase.execute({ id });
  }

  @Get()
  findAll(
    @Param('workspaceId') workspaceId: string,
  ): Promise<GetProjectsOutput> {
    return this.getProjectsUseCase.execute({ workspaceId });
  }
}
