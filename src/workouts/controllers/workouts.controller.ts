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
  Query,
} from '@nestjs/common';
import { WorkoutsService } from '../services/workouts.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Workout } from '../models/workout.model';

@UseGuards(AuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createWorkout: Workout,
    @Req() req: Request,
  ): Promise<Workout> {
    const userId = req['user'].id;

    return this.workoutsService.create(createWorkout, userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get('search')
  async filterWorkouts(
    @Query()
    query: { date: Date; exerciseType: string; muscleGroups: string[] },
    @Req() req: Request,
  ): Promise<Workout[]> {
    const userId = req['user'].id;

    return this.workoutsService
      .filterWorkouts(
        userId,
        query.date,
        query.exerciseType,
        query.muscleGroups,
      )
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get('exerciseTypeProgress')
  @HttpCode(200)
  async exerciseTypeProgress(
    @Query() query: { startDate: Date; endDate: Date },
    @Req() req: Request,
  ): Promise<Workout[]> {
    const userId = req['user'].id;

    return this.workoutsService
      .exerciseTypeProgress(userId, query.startDate, query.endDate)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get('measurementProgress')
  @HttpCode(200)
  async measurementProgress(
    @Query() query: { startDate: Date; endDate: Date },
    @Req() req: Request,
  ): Promise<Workout[]> {
    const userId = req['user'].id;

    return this.workoutsService
      .measurementProgress(userId, query.startDate, query.endDate)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get('findByUser')
  @HttpCode(200)
  async findByUser(@Req() req: Request): Promise<Workout[]> {
    const userId = req['user'].id;

    return this.workoutsService.findAll(userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get('findAll')
  @HttpCode(200)
  async findAll(): Promise<Workout[]> {
    return this.workoutsService.findAll().catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Workout> {
    return this.workoutsService.findOne(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateWorkout: Partial<Workout>,
    @Req() req: Request,
  ) {
    const userId = req['user'].id;

    return this.workoutsService
      .update(id, updateWorkout, userId)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user'].id;

    return this.workoutsService.remove(id, userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }
}
