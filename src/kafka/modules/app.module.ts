import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConsumeService } from './services/consume.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/cpm'),
    ScheduleModule.forRoot(),
  ],
  providers: [ConsumeService],
})
export class AppModule {}
