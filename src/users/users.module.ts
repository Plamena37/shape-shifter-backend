import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaClass } from 'src/users/schemas/user.schema';
import { User } from './models/user.model';
import { PasswordService } from './services/password.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/shared/guards/roles.guard';

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
  controllers: [UsersController],
  providers: [UsersService, PasswordService, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}
