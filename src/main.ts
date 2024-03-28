import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // means that all incoming requests will be validated by the ValidationPipe
    new ValidationPipe({
      whitelist: true, // means that all incoming requests will be stripped of any properties that do not have any decorators
      forbidNonWhitelisted: true, // means that if a request comes in with properties that do not have any decorators, the request will be rejected
      transform: true, // means that all incoming request payloads will be transformed into instances of the DTO classes they are bound to
    }),
  );
  await app.listen(8080);
}
bootstrap();
