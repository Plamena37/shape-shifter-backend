import { Module } from '@nestjs/common';
import { MeasurementEventsService } from './services/measurement-events.service';
import { MeasurementEventsController } from './controllers/measurement-events.controller';
import { MeasurmentEvent } from './models/measurement-event.model';
import { MeasurmentEventSchemaClass } from './schemas/measurement-event.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MeasurmentEvent.name,
        schema: MeasurmentEventSchemaClass,
      },
    ]),
  ],
  controllers: [MeasurementEventsController],
  providers: [MeasurementEventsService],
})
export class MeasurementEventsModule {}
