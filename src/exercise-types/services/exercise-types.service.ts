import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseTypes } from '../models/exercise-types.model';
import { ExerciseTypeDocument } from '../schemas/exercise-types.schema';

@Injectable()
export class ExerciseTypesService {
  constructor(
    @InjectModel(ExerciseTypes.name)
    private exerciseTypeModel: Model<ExerciseTypeDocument>,
  ) {}

  async create(createExerciseType: ExerciseTypes): Promise<ExerciseTypes> {
    const createdExerciseType = new this.exerciseTypeModel({
      ...createExerciseType,
    });

    return await createdExerciseType.save();
  }

  async findAll(): Promise<ExerciseTypes[]> {
    return this.exerciseTypeModel.find();
  }

  async findOne(id: string): Promise<ExerciseTypes> {
    return this.exerciseTypeModel.findById(id);
  }

  async update(
    id: string,
    updateExerciseType: Partial<ExerciseTypes>,
  ): Promise<ExerciseTypes> {
    const existingExerciseType = await this.exerciseTypeModel.findById(id);
    if (!existingExerciseType) {
      throw new Error('Exercise type not found');
    }

    return this.exerciseTypeModel.findByIdAndUpdate(id, updateExerciseType, {
      new: true,
    });
  }

  async remove(id: string): Promise<ExerciseTypes> {
    const existingExerciseType = await this.exerciseTypeModel.findById(id);
    if (!existingExerciseType) {
      throw new Error('Exercise type not found');
    }

    return this.exerciseTypeModel.findByIdAndRemove(id);
  }

  async searchByNameAndMuscleGroup(
    exerciseName: string,
    muscleGroups: string[],
  ) {
    if (!exerciseName && !muscleGroups) {
      throw new Error(
        'Exercise type with that name and muscle group does not exist',
      );
    }

    const nameQuery = exerciseName
      ? { name: { $regex: exerciseName, $options: 'i' } }
      : {};

    const groupsQuery =
      muscleGroups && muscleGroups.length > 0
        ? {
            muscleGroups: {
              $all: muscleGroups.map((muscle) => new RegExp(muscle, 'i')),
            },
          }
        : {};

    const exerciseTypes = await this.exerciseTypeModel.find({
      ...nameQuery,
      ...groupsQuery,
    });

    return exerciseTypes;
  }
}
