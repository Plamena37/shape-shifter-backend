import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user.model';
import { UserDocument } from 'src/users/schemas/user.schema';
import { PasswordService } from 'src/users/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const isPasswordMatched = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const payload = { email, id: user._id };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
