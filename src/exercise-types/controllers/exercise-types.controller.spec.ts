import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseTypesController } from './exercise-types.controller';
import { ExerciseTypesService } from '../services/exercise-types.service';

describe('ExerciseTypesController', () => {
  let controller: ExerciseTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseTypesController],
      providers: [ExerciseTypesService],
    }).compile();

    controller = module.get<ExerciseTypesController>(ExerciseTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
