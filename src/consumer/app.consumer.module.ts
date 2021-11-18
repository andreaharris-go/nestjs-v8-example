import { Module } from '@nestjs/common';
import { ExampleConsumerModule } from './modules/example/example.consumer.module';

@Module({
  imports: [ExampleConsumerModule],
})
export class AppConsumerModule {}
