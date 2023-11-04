import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise } from '../models/exercise.model';
import { Model } from 'mongoose';
import { ExerciseDocument } from '../schemas/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async create(createExercise: Exercise, creatorId: string): Promise<Exercise> {
    const createdExercise = new this.exerciseModel({
      ...createExercise,
      creatorId,
    });

    return await createdExercise.save();
  }

  async findAll(userId?: string): Promise<Exercise[]> {
    const idQuery = userId ? { creatorId: { $eq: userId } } : {};

    return this.exerciseModel.find({
      ...idQuery,
    });
  }

  async findOne(id: string, userId: string): Promise<Exercise> {
    const existingExercise = await this.exerciseModel.findById(id);
    const creatorId = existingExercise.creatorId;

    if (!existingExercise || userId !== creatorId) {
      throw new Error('Exercise not found');
    }

    return this.exerciseModel.findById(id);
  }

  async update(
    id: string,
    updateExercise: Partial<Exercise>,
    userId: string,
  ): Promise<Exercise> {
    const existingExercise = await this.exerciseModel.findById(id);
    const creatorId = existingExercise.creatorId;

    if (!existingExercise || userId !== creatorId) {
      throw new Error('Exercise not found');
    }

    return this.exerciseModel.findByIdAndUpdate(id, updateExercise, {
      new: true,
    });
  }

  async remove(id: string, userId: string) {
    const existingExercise = await this.exerciseModel.findById(id);
    const creatorId = existingExercise.creatorId;

    if (!existingExercise || userId !== creatorId) {
      throw new Error('Exercise not found');
    }

    return this.exerciseModel.findByIdAndRemove(id);
  }
}
