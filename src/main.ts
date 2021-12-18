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
            brokers: process.env.KAFKA.split(',')
          },
          consumer: {
            groupId: process.env.GROUPID
          }
      }
  });

  app.listen();
}


bootstrap();
