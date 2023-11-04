export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export enum ExerciseType {
  PECTORALS = 'pectorals',
  DELTOIDS = 'deltoids',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  DELTS = 'delts',
  QUADRICEPS = 'quadriceps',
  GLUTES = 'glutes',
  HAMSTRINGS = 'hamstrings',
  CALVES = 'calves',
  LATS = 'lats',
  TRAPEZIUS = 'trapezius',
  ABDOMINALS = 'abdominals',
  OBLIQUES = 'obliques',
  RHOMBOIDS = 'rhomboids',
  SHOULDERS = 'shoulders',
}

export interface MatchQuery {
  userId: string;
  createdAt?: {
    $gte: Date;
    $lt: Date;
  };
}
