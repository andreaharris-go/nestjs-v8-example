import { NestFactory } from '@nestjs/core';
import { AppModule } from './kafka/modules/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'client-id-1',
          brokers: ['pkc-ldvr1.asia-southeast1.gcp.confluent.cloud:9092'],
        },
        consumer: {
          groupId: 'group-id-1',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
