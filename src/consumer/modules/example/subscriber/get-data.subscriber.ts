import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class GetDataSubscriber {
  constructor(
    @InjectQueue('example-queue') private readonly exampleQueue: Queue,
  ) {}

  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: '',
    queue: 'yohk_kafka',
  })
  async pubSubHandler(message: JSON) {
    console.log(`Received message: ${JSON.stringify(message)}`);
    this.exampleQueue.add('example-queue-default', message);
  }
}
