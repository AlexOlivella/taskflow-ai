import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WorkspaceNotFoundFilter } from './infrastructure/http/filters/workspace-not-found.filter';
import { ProjectNameAlreadyExistsFilter } from './infrastructure/http/filters/project-name-already-exists.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new WorkspaceNotFoundFilter(),
    new ProjectNameAlreadyExistsFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
