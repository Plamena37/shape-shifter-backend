import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Required } from '../../shared/decorators/common-decorators';
import { ExerciseType } from 'src/shared/enums/common-enums';

export type ExerciseTypeDocument = HydratedDocument<ExerciseTypeSchema>;

@Schema()
export class ExerciseTypeSchema {
  @Required()
  name: string;

  @Required()
  muscleGroups: ExerciseType[];
}

export const ExerciseTypeSchemaClass =
  SchemaFactory.createForClass(ExerciseTypeSchema);
