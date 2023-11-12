import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);

  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
