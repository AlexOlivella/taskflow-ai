import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskOutput } from 'src/application/task/create-task/create-task.output';
import { CreateTaskUseCase } from 'src/application/task/create-task/create-task.use-case';
import { CreateTaskRequest } from '../dto/create-task.request';
import { GetTasksOutput } from 'src/application/task/get-tasks/get-tasks.output';
import { GetTasksUseCase } from 'src/application/task/get-tasks/get-tasks.use-case';

@Controller('workspaces/:workspaceId/tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
  ) {}

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

  @Get()
  findAll(@Param('workspaceId') workspaceId: string): Promise<GetTasksOutput> {
    return this.getTasksUseCase.execute({ workspaceId });
  }
}
