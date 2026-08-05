import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskOutput } from 'src/application/task/create-task/create-task.output';
import { CreateTaskUseCase } from 'src/application/task/create-task/create-task.use-case';
import { CreateTaskRequest } from '../dto/create-task.request';
import { GetTasksOutput } from 'src/application/task/get-tasks/get-tasks.output';
import { GetTasksUseCase } from 'src/application/task/get-tasks/get-tasks.use-case';
import { GetTaskOutput } from 'src/application/task/get-task/get-task.output';
import { GetTaskUseCase } from 'src/application/task/get-task/get-task.use-case';
import { UpdateTaskOutput } from 'src/application/task/update-task/update-task.output';
import { UpdateTaskUseCase } from 'src/application/task/update-task/update-task.use-case';
import { UpdateTaskRequest } from '../dto/update-task.request';

@Controller('workspaces/:workspaceId/tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
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

  @Get(':id')
  findById(@Param('id') id: string): Promise<GetTaskOutput> {
    return this.getTaskUseCase.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTaskRequest,
  ): Promise<UpdateTaskOutput> {
    return this.updateTaskUseCase.execute({ id, name: body.name });
  }
}
