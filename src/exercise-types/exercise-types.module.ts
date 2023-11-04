import { Module } from '@nestjs/common';
import { ExerciseTypesService } from './services/exercise-types.service';
import { ExerciseTypesController } from './controllers/exercise-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseTypes } from './models/exercise-types.model';
import { ExerciseTypeSchemaClass } from './schemas/exercise-types.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: ExerciseTypes.name,
        schema: ExerciseTypeSchemaClass,
      },
    ]),
  ],
  controllers: [ExerciseTypesController],
  providers: [ExerciseTypesService],
})
export class ExerciseTypesModule {}
