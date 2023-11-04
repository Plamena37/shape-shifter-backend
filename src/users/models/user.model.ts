import {
  IsDateString,
  IsEmail,
  IsIn,
  IsString,
  MinLength,
} from 'class-validator';
import { IsNumberInRange } from 'src/shared/decorators/common-decorators';
import { Gender, Role } from 'src/shared/enums/common-enums';

export class User {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  role: Role;

  @IsIn(['male', 'female'])
  gender: Gender;

  @IsDateString()
  dateOfBirth: Date;

  @IsNumberInRange(100, 250)
  height: number;
}
