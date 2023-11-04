import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IsExerciseTypeId,
  Optional,
  Required,
} from '../../shared/decorators/common-decorators';
import { IsNumber } from 'class-validator';

export type ExerciseDocument = HydratedDocument<ExerciseSchema>;

@Schema()
export class ExerciseSchema {
  @Required()
  @IsExerciseTypeId()
  exerciseType: string;

  @Required()
  creatorId: string;

  @Required()
  @IsNumber()
  series: number;

  @Optional()
  repetitions: number;

  @Optional()
  weight: number;

  @Optional()
  time: string;

  @Optional()
  distance: number;
}

export const ExerciseSchemaClass = SchemaFactory.createForClass(ExerciseSchema);
