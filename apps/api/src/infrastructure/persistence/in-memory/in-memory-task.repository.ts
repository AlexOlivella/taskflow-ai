import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/application/task/task.repository';
import { Task } from 'src/domain/task/task.entity';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks: Task[] = [];

  save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex(
      (taskItem) => taskItem.id === task.id,
    );

    if (taskIndex !== -1) {
      this.tasks[taskIndex] = task;
    } else {
      this.tasks.push(task);
    }

    return Promise.resolve();
  }

  findById(id: string): Promise<Task | null> {
    return Promise.resolve(
      this.tasks.find((taskItem) => taskItem.id === id) || null,
    );
  }

  findByWorkspaceId(workspaceId: string): Promise<Task[]> {
    return Promise.resolve(
      this.tasks.filter((taskItem) => taskItem.workspaceId === workspaceId),
    );
  }
}
