import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Required } from '../../shared/decorators/common-decorators';

export type MeasurmentEventDocument = HydratedDocument<MeasurmentEventSchema>;

@Schema()
export class MeasurmentEventSchema {
  @Required()
  photoUrl: string;

  @Required()
  weight: number;

  @Required()
  chest: number;

  @Required()
  waist: number;

  @Required()
  hips: number;

  @Required()
  biceps: number;

  @Required()
  userId: string;

  @Required()
  date: string;
}

export const MeasurmentEventSchemaClass = SchemaFactory.createForClass(
  MeasurmentEventSchema,
);
