import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementEventsService } from './measurement-events.service';

describe('MeasurementEventsService', () => {
  let service: MeasurementEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementEventsService],
    }).compile();

    service = module.get<MeasurementEventsService>(MeasurementEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
