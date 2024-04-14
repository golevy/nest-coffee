import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // means that all incoming requests will be validated by the ValidationPipe
    new ValidationPipe({
      whitelist: true, // means that all incoming requests will be stripped of any properties that do not have any decorators
      forbidNonWhitelisted: true, // means that if a request comes in with properties that do not have any decorators, the request will be rejected
      transform: true, // means that all incoming request payloads will be transformed into instances of the DTO classes they are bound to
      transformOptions: {
        enableImplicitConversion: true, // means that if a request comes in with a string value for a query parameter that is supposed to be a number, the string will be converted to a number
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Coffee API')
    .setDescription('This is a simple coffee API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
