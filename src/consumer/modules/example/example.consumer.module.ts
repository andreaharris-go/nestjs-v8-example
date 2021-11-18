import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { GetDataSubscriber } from './subscriber/get-data.subscriber';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'amq.topic',
          type: 'topic',
        },
      ],
      uri:
        `amqps://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}/` +
        encodeURIComponent(process.env.RABBITMQ_VHOST),
    }),
    BullModule.registerQueue({
      name: 'example-queue',
      redis: {
        port: 6379,
      },
    }),
    ConfigModule,
  ],
  providers: [GetDataSubscriber],
})
export class ExampleConsumerModule {}
