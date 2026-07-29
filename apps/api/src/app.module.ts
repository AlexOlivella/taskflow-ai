import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './infrastructure/http/workspace.module';
import { ProjectModule } from './infrastructure/http/project.module';
import { TaskModule } from './infrastructure/http/task.module';

@Module({
  imports: [WorkspaceModule, ProjectModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
