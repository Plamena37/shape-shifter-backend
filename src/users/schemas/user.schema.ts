import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Required,
  GenderProp,
} from '../../shared/decorators/common-decorators';
import { IsEmail, IsString } from 'class-validator';
import { Gender, Role } from 'src/shared/enums/common-enums';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema()
export class UserSchema {
  _id: string;

  @Required()
  @IsString()
  name: string;

  @Required()
  @IsEmail()
  email: string;

  @Required()
  password: string;

  @Prop({ default: Role.USER })
  role: Role;

  @Required()
  @GenderProp()
  gender: Gender;

  @Required()
  dateOfBirth: Date;

  @Required()
  height: number;
}

export const UserSchemaClass = SchemaFactory.createForClass(UserSchema);
