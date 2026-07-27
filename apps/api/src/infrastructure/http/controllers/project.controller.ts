import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateProjectOutput } from 'src/application/project/create-project/create-project.output';
import { CreateProjectUseCase } from 'src/application/project/create-project/create-project.use-case';
import { CreateProjectRequest } from '../dto/create-project.request';

@Controller('workspaces/:workspaceId/projects')
export class ProjectController {
  constructor(private readonly createProjectUseCase: CreateProjectUseCase) {}

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
}
