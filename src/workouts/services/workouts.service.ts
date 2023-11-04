import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workout } from '../models/workout.model';
import { Model } from 'mongoose';
import { WorkoutDocument } from '../schemas/workout.schema';
import { MatchQuery } from 'src/shared/enums/common-enums';
import { isDateInRange } from 'src/shared/utils/common-utils';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}

  async create(createWorkout: Workout, userId: string): Promise<Workout> {
    const createdWorkout = new this.workoutModel({
      ...createWorkout,
      userId,
    });

    return await createdWorkout.save();
  }

  async findAll(userId?: string): Promise<Workout[]> {
    const idQuery = userId ? { userId: { $eq: userId } } : {};

    return this.workoutModel
      .find({
        ...idQuery,
      })
      .sort({ date: 1 });
  }

  async findOne(id: string): Promise<Workout> {
    const existingWorkout = await this.workoutModel.findById(id);

    if (!existingWorkout) {
      throw new Error('Workout not found');
    }

    return this.workoutModel.findById(id);
  }

  async update(
    id: string,
    updateWorkout: Partial<Workout>,
    userId: string,
  ): Promise<Workout> {
    const existingWorkout = await this.workoutModel.findById(id);
    const creatorId = existingWorkout.userId;

    if (!existingWorkout || userId !== creatorId) {
      throw new Error('Workout not found');
    }

    return this.workoutModel.findByIdAndUpdate(id, updateWorkout, {
      new: true,
    });
  }

  async remove(id: string, userId: string) {
    const existingWorkout = await this.workoutModel.findById(id);
    const creatorId = existingWorkout.userId;

    if (!existingWorkout || userId !== creatorId) {
      throw new Error('Workout not found');
    }

    return this.workoutModel.findByIdAndRemove(id);
  }

  async filterWorkouts(
    userId: string,
    date?: Date | string,
    exerciseType?: string,
    muscleGroups?: string[],
  ): Promise<Workout[]> {
    if (!date && !exerciseType && !muscleGroups) {
      throw new Error('No entered parameters');
    }

    const matchQuery: MatchQuery = { userId };

    if (date) {
      matchQuery['date'] = {
        $eq: date,
      };
    }

    if (exerciseType) {
      matchQuery['found_exercise_types.name'] = {
        $regex: exerciseType,
        $options: 'i',
      };
    }

    if (muscleGroups) {
      matchQuery['found_exercise_types.muscleGroups'] = {
        $all: muscleGroups.map((muscle) => new RegExp(muscle, 'i')),
      };
    }

    const workouts = await this.workoutModel.aggregate([
      {
        $unwind: {
          path: '$exercises',
        },
      },
      {
        $lookup: {
          from: 'exercises',
          let: { exerciseObjectID: { $toObjectId: '$exercises' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$exerciseObjectID'] },
              },
            },
          ],
          as: 'found_exercises',
        },
      },
      {
        $unwind: {
          path: '$found_exercises',
        },
      },
      {
        $lookup: {
          from: 'exercisetypes',
          let: {
            exerciseTypeObjectId: {
              $toObjectId: '$found_exercises.exerciseType',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$exerciseTypeObjectId'] },
              },
            },
          ],

          as: 'found_exercise_types',
        },
      },
      {
        $unwind: {
          path: '$found_exercise_types',
        },
      },
      {
        $match: matchQuery,
      },
      {
        $sort: {
          'found_exercise_types.date': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          userId: { $first: '$userId' },
          exercises: { $push: '$found_exercises' },
          date: { $first: '$date' },
          __v: { $first: '$__v' },
          found_exercise_types: { $push: '$found_exercise_types' },
        },
      },
    ]);

    return workouts;
  }

  async exerciseTypeProgress(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Workout[]> {
    if (!userId) {
      throw new Error('Unauthorized!');
    }

    const matchQuery: MatchQuery = { userId };

    if (startDate && endDate) {
      isDateInRange(startDate, matchQuery, endDate);
    }

    const exerciseProgress = await this.workoutModel.aggregate([
      {
        $unwind: {
          path: '$exercises',
        },
      },
      {
        $lookup: {
          from: 'exercises',
          let: { exerciseObjectID: { $toObjectId: '$exercises' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$exerciseObjectID'] },
              },
            },
          ],
          as: 'found_exercises',
        },
      },
      {
        $unwind: {
          path: '$found_exercises',
        },
      },
      {
        $lookup: {
          from: 'exercisetypes',
          let: {
            exerciseTypeObjectId: {
              $toObjectId: '$found_exercises.exerciseType',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$exerciseTypeObjectId'] },
              },
            },
          ],

          as: 'found_exercise_types',
        },
      },
      {
        $unwind: {
          path: '$found_exercise_types',
        },
      },
      {
        $match: matchQuery,
      },
    ]);

    return exerciseProgress.map((el) => el.found_exercise_types);
  }

  async measurementProgress(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Workout[]> {
    if (!userId) {
      throw new Error('Unauthorized!');
    }

    const matchQuery: MatchQuery = { userId };

    if (startDate && endDate) {
      isDateInRange(startDate, matchQuery, endDate);
    }

    const measurementProgress = await this.workoutModel.aggregate([
      {
        $unwind: {
          path: '$exercises',
        },
      },
      {
        $lookup: {
          from: 'measurmentevents',
          let: {
            userObjectId: '$userId',
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$user', '$$userObjectId'] },
              },
            },
          ],

          as: 'found_users',
        },
      },
      {
        $unwind: {
          path: '$found_users',
        },
      },
      {
        $match: matchQuery,
      },
    ]);

    return measurementProgress.map((el) => el.found_users);
  }
}
