import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/users/models/user.model';
import { UserSchemaClass } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from 'src/users/services/password.service';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchemaClass,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, UsersService, RolesGuard],
})
export class AuthModule {}
