import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ExerciseTypesService } from '../services/exercise-types.service';
import { ExerciseTypes } from '../models/exercise-types.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/common-decorators';
import { Role } from 'src/shared/enums/common-enums';

@UseGuards(AuthGuard)
@Controller('exercise-types')
export class ExerciseTypesController {
  constructor(private readonly exerciseTypesService: ExerciseTypesService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async create(
    @Body() createExerciseType: ExerciseTypes,
  ): Promise<ExerciseTypes> {
    return this.exerciseTypesService
      .create(createExerciseType)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get('search')
  async searchByNameAndMuscleGroup(
    @Query() query: { name: string; muscleGroups: string[] },
  ) {
    return this.exerciseTypesService
      .searchByNameAndMuscleGroup(query.name, query.muscleGroups)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<ExerciseTypes[]> {
    return this.exerciseTypesService.findAll().catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ExerciseTypes> {
    return this.exerciseTypesService.findOne(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateMeasurementEvent: Partial<ExerciseTypes>,
  ) {
    return this.exerciseTypesService
      .update(id, updateMeasurementEvent)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return this.exerciseTypesService.remove(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }
}
