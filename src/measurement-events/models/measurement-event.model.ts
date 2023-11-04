import { IsDateString } from 'class-validator';
import { IsNumberInRange } from 'src/shared/decorators/common-decorators';

export class MeasurmentEvent {
  photoUrl: string;

  @IsNumberInRange(30, 250)
  weight: number; // in kg

  @IsNumberInRange(30, 250)
  chest: number; // in cm

  @IsNumberInRange(30, 200)
  waist: number; // in cm

  @IsNumberInRange(30, 200)
  hips: number; // in cm

  @IsNumberInRange(10, 100)
  biceps: number; // in cm

  @IsDateString()
  date: string;

  userId: string;
}
