import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [BugsnagPluginExpress],
  appVersion: process.env.APP_VERSION,
  logger: null
});

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
          client: {
              //brokers: ['52.77.183.114:9092','52.77.183.114:9093','52.77.183.114:9094'],
              //brokers: ['18.138.95.160:9092','18.138.95.160:9093','18.138.95.160:9094'],
              //brokers: ['167.172.71.139:9092','167.172.71.139:9093','167.172.71.139:9094'],
              brokers: ['108.136.187.157:9092','108.136.187.157:9093','108.136.187.157:9094'],

              
          },
          consumer: {
              groupId: 'buyer-microservice-local2',
          }
      }
  });

  app.listen();
}


bootstrap();
