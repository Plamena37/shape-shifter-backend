import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { PasswordService } from './password.service';
import { Role } from 'src/shared/enums/common-enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private passwordService: PasswordService,
  ) {}

  async create(createUser: User): Promise<User> {
    const { email, password } = createUser;

    const existingUser = await this.userModel.findOne({
      email,
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const createdUser = new this.userModel({
      ...createUser,
      password: hashedPassword,
    });

    await createdUser.save();

    return await this.userModel.findOne(
      { email },
      { ...createdUser },
      {
        projection: { password: 0 },
      },
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUser: Partial<User>): Promise<User> {
    const curUser = await this.userModel.findById(id);

    if (updateUser.password && updateUser.password !== curUser.password) {
      const hashedPassword = await this.passwordService.hashPassword(
        updateUser.password,
      );
      updateUser.password = hashedPassword;
    }

    return this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
      projection: { password: 0 },
    });
  }

  async updateRole(id: string, updateUser: Partial<User>): Promise<User> {
    const { role } = updateUser;

    if (role) {
      const validRoles = [Role.ADMIN, Role.USER];

      if (!validRoles.includes(role)) {
        throw new Error('Role is invalid!');
      }
    }

    return this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
      projection: { password: 0 },
    });
  }

  async remove(id: string): Promise<User> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return this.userModel.findByIdAndRemove(id);
  }
}
