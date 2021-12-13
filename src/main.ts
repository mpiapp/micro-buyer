import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [BugsnagPluginExpress],
  appVersion: process.env.APP_VERSION,
  logger: null
});
/*
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Buyer API')
  .setDescription('Buyer Service API')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const bugsnagMiddleware = Bugsnag.getPlugin('express');
  app.use(bugsnagMiddleware.requestHandler);
  app.use(bugsnagMiddleware.errorHandler);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
*/
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
          client: {
              //brokers: ['52.77.183.114:9092','52.77.183.114:9093','52.77.183.114:9094'],
              //brokers: ['18.138.95.160:9092','18.138.95.160:9093','18.138.95.160:9094'],
              brokers: ['167.172.71.139:9092','167.172.71.139:9093','167.172.71.139:9094'],

              
          },
          consumer: {
              groupId: 'buyer-micro2',
          }
      }
  });

  app.listen();
}


bootstrap();
