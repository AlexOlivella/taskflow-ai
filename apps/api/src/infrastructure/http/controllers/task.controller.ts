import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateTaskOutput } from 'src/application/task/create-task/create-task.output';
import { CreateTaskUseCase } from 'src/application/task/create-task/create-task.use-case';
import { CreateTaskRequest } from '../dto/create-task.request';

@Controller('workspaces/:workspaceId/tasks')
export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  create(
    @Param('workspaceId') workspaceId: string,
    @Body() body: CreateTaskRequest,
  ): Promise<CreateTaskOutput> {
    return this.createTaskUseCase.execute({
      workspaceId,
      projectId: body.projectId ?? null,
      name: body.name,
    });
  }
}
