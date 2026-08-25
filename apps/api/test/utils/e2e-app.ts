import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { WorkspaceNotFoundFilter } from 'src/infrastructure/http/filters/workspace-not-found.filter';
import { ProjectNameAlreadyExistsFilter } from 'src/infrastructure/http/filters/project-name-already-exists.filter';

export function setupE2EApp(): {
  getApp: () => INestApplication<App>;
} {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(
      new WorkspaceNotFoundFilter(),
      new ProjectNameAlreadyExistsFilter(),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  return {
    getApp: () => app,
  };
}
