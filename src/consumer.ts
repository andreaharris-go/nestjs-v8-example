import { NestFactory } from '@nestjs/core';
import { AppConsumerModule } from './consumer/app.consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(AppConsumerModule);
  await app.listen(3033, () => console.log('start consuming...'));
}
bootstrap();
