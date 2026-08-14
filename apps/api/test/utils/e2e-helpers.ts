import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateWorkspaceInput } from 'src/application/workspace/create-workspace/create-workspace.input';
import { CreateWorkspaceOutput } from 'src/application/workspace/create-workspace/create-workspace.output';
import { App } from 'supertest/types';

export async function createWorkspace(
  app: INestApplication<App>,
  input: CreateWorkspaceInput = {
    name: 'Workspace 1',
  },
): Promise<CreateWorkspaceOutput> {
  const response = await request(app.getHttpServer())
    .post('/workspaces')
    .send(input);

  return response.body as CreateWorkspaceOutput;
}
