import { IsMilitaryTime, IsMongoId, ValidateIf } from 'class-validator';
import { IsNumberInRange } from 'src/shared/decorators/common-decorators';

export class Exercise {
  @IsMongoId({ message: 'Not a valid exercise type!' })
  exerciseType: string;

  creatorId: string;

  @IsNumberInRange(0, 100)
  series: number;

  @ValidateIf((o) => o.repetitions !== undefined)
  @IsNumberInRange(0, 100)
  repetitions: number;

  @ValidateIf((o) => o.weight !== undefined)
  @IsNumberInRange(0, 300)
  weight: number;

  @ValidateIf((o) => o.time !== undefined)
  time: string;

  @ValidateIf((o) => o.distance !== undefined)
  @IsNumberInRange(0, 300)
  distance: number;
}
