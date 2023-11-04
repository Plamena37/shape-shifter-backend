import { IsArray, IsDateString } from 'class-validator';
import { Exercise } from 'src/exercises/models/exercise.model';

export class Workout {
  userId: string;

  @IsArray()
  exercises: Exercise[];

  @IsDateString()
  date: string;
}
