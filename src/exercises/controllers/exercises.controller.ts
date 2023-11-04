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
  Req,
} from '@nestjs/common';
import { ExercisesService } from '../services/exercises.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Exercise } from '../models/exercise.model';

@UseGuards(AuthGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createExercise: Exercise,
    @Req() req: Request,
  ): Promise<Exercise> {
    const userId = req['user'].id;

    return this.exercisesService
      .create(createExercise, userId)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get('findByUser')
  @HttpCode(200)
  async findByUser(@Req() req: Request): Promise<Exercise[]> {
    const userId = req['user'].id;

    return this.exercisesService.findAll(userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get('findAll')
  @HttpCode(200)
  async findAll(): Promise<Exercise[]> {
    return this.exercisesService.findAll().catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Exercise> {
    const userId = req['user'].id;

    return this.exercisesService.findOne(id, userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateExercise: Partial<Exercise>,
    @Req() req: Request,
  ) {
    const userId = req['user'].id;

    return this.exercisesService
      .update(id, updateExercise, userId)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user'].id;

    return this.exercisesService.remove(id, userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }
}
