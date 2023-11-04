import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './users/services/password.service';
import { AuthModule } from './auth/auth.module';
import { MeasurementEventsModule } from './measurement-events/measurement-events.module';
import { ExerciseTypesModule } from './exercise-types/exercise-types.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jh9mb2v.mongodb.net/shape-shifter?retryWrites=true&w=majority`,
    ),
    AuthModule,
    MeasurementEventsModule,
    ExerciseTypesModule,
    ExercisesModule,
    WorkoutsModule,
  ],
  controllers: [],
  providers: [PasswordService],
})
export class AppModule {}
