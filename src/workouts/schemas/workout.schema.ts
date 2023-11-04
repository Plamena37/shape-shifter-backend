import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Required } from '../../shared/decorators/common-decorators';
import { Exercise } from 'src/exercises/models/exercise.model';

export type WorkoutDocument = HydratedDocument<WorkoutSchema>;

@Schema()
export class WorkoutSchema {
  @Required()
  userId: string;

  @Required()
  exercises: Exercise[];

  @Required()
  date: string;
}

export const WorkoutSchemaClass = SchemaFactory.createForClass(WorkoutSchema);
