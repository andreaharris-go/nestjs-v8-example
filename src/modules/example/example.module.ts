import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/example.schema';
import { ExampleMongoGetAllController } from './controllers/exampleMongoGetAll.controller';
import { ExampleService } from './example.service';
import { ExampleMongoGetByIdController } from './controllers/exampleMongoGetById.controller';
import { FetchDataSchedule } from './schedule/fetch-data.schedule';
import { ExampleProcessor } from './queue/example.processor';
import { ExampleQueueRunnerController } from './controllers/exampleQueueRunner.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      {
        name: Example.name,
        schema: ExampleSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'example-queue',
      redis: {
        port: 6379,
      },
    }),
  ],
  providers: [ExampleService, FetchDataSchedule, ExampleProcessor],
  controllers: [
    ExampleMongoGetAllController,
    ExampleMongoGetByIdController,
    ExampleQueueRunnerController,
  ],
})
export class ExampleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'mongo/examples', method: RequestMethod.GET },
        { path: 'mongo/examples/:id', method: RequestMethod.GET },
        { path: 'queue/examples/', method: RequestMethod.GET },
      );
  }
}
