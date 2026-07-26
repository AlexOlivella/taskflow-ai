import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WorkspaceNotFoundFilter } from './infrastructure/http/filters/workspace-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new WorkspaceNotFoundFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
