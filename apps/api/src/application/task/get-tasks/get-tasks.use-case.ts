import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { GetTasksInput } from './get-tasks.input';
import { GetTasksOutput } from './get-tasks.output';

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(input: GetTasksInput): Promise<GetTasksOutput> {
    const tasks = await this.taskRepository.findByWorkspaceId(
      input.workspaceId,
    );
    return {
      tasks: tasks.map((taskElement) => ({
        id: taskElement.id,
        workspaceId: taskElement.workspaceId,
        projectId: taskElement.projectId,
        name: taskElement.name,
      })),
    };
  }
}
