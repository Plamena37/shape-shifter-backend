import { Prop } from '@nestjs/mongoose';
import { Gender, Role } from '../enums/common-enums';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { SetMetadata } from '@nestjs/common';
import { capitalizeFirstLetter } from '../utils/common-utils';
import { User } from 'src/users/models/user.model';
import { ExerciseTypes } from 'src/exercise-types/models/exercise-types.model';
import mongoose from 'mongoose';

export const Required = (): PropertyDecorator => Prop({ required: true });

export const Optional = (): PropertyDecorator => Prop();

export const GenderProp = (): PropertyDecorator =>
  Prop({
    type: String,
    enum: Object.values(Gender),
  });

export const IsUserId = (): PropertyDecorator =>
  Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name });

export const IsExerciseTypeId = (): PropertyDecorator =>
  Prop({ type: mongoose.Schema.Types.ObjectId, ref: ExerciseTypes.name });

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export const IsNumberInRange = (
  startNumber: number,
  endNumber: number,
  validationOptions?: ValidationOptions,
) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNumberInRange',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let valueToNumber = Number(value);
          return valueToNumber >= startNumber && valueToNumber <= endNumber;
        },
        defaultMessage(args: ValidationArguments) {
          const result = capitalizeFirstLetter(propertyName);

          return `${result} value must be between ${startNumber} and ${endNumber}.`;
        },
      },
    });
  };
};
