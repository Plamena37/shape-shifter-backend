import { Module } from '@nestjs/common';
import { WorkoutsService } from './services/workouts.service';
import { WorkoutsController } from './controllers/workouts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout } from './models/workout.model';
import { WorkoutSchemaClass } from './schemas/workout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workout.name,
        schema: WorkoutSchemaClass,
      },
    ]),
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
