import { Injectable } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { kafkaClientOptions, options } from '../../../config/kafka.config';

@Injectable()
export class ConsumeService {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka(kafkaClientOptions);
    this.consumer = this.kafka.consumer(options);
  }

  async consumeMessage(): Promise<void> {
    await this.consumer.subscribe({
      topic: 'test1',
      fromBeginning: true,
    });

    this.consumer.run({
      eachMessage: async (message) => {
        console.log(message);
      },
    });
  }
}
