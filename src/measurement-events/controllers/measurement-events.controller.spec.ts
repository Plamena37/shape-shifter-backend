import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementEventsController } from './measurement-events.controller';
import { MeasurementEventsService } from '../services/measurement-events.service';

describe('MeasurementEventsController', () => {
  let controller: MeasurementEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementEventsController],
      providers: [MeasurementEventsService],
    }).compile();

    controller = module.get<MeasurementEventsController>(
      MeasurementEventsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
