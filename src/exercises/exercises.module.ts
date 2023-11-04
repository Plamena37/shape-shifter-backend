import { Module } from '@nestjs/common';
import { ExercisesService } from './services/exercises.service';
import { ExercisesController } from './controllers/exercises.controller';
import { Exercise } from './models/exercise.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchemaClass } from './schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exercise.name,
        schema: ExerciseSchemaClass,
      },
    ]),
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
