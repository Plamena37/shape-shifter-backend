import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/shared/decorators/common-decorators';
import { Role } from 'src/shared/enums/common-enums';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUser: User): Promise<User> {
    return this.usersService.create(createUser).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll().catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUser: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateUser).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Patch('/change-role/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateRole(
    @Param('id') id: string,
    @Body() updateUser: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateRole(id, updateUser).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }
}
