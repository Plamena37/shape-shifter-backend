import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseTypesService } from './exercise-types.service';

describe('ExerciseTypesService', () => {
  let service: ExerciseTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseTypesService],
    }).compile();

    service = module.get<ExerciseTypesService>(ExerciseTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
