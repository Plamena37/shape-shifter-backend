import { ArrayUnique, IsArray, IsEnum, IsString } from 'class-validator';
import { ExerciseType } from 'src/shared/enums/common-enums';

export class ExerciseTypes {
  @IsString()
  name: string;

  @IsArray()
  @ArrayUnique()
  @IsEnum(ExerciseType, {
    each: true,
    message: `MuscleGroups must be one of the following values: ${Object.values(
      ExerciseType,
    ).join(', ')}`,
  })
  muscleGroups: ExerciseType[];
}
