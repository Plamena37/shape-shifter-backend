import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MeasurementEventsService } from '../services/measurement-events.service';
import { MeasurmentEvent } from '../models/measurement-event.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('measurement-events')
export class MeasurementEventsController {
  constructor(
    private readonly measurementEventsService: MeasurementEventsService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createMeasurementEvent: MeasurmentEvent,
    @Req() req: Request,
  ): Promise<MeasurmentEvent> {
    const userId = req['user'].id;

    return this.measurementEventsService
      .create(createMeasurementEvent, userId)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Get()
  @HttpCode(200)
  async findByUser(@Req() req: Request): Promise<MeasurmentEvent[]> {
    const userId = req['user'].id;

    return this.measurementEventsService.findByUser(userId).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<MeasurmentEvent> {
    return this.measurementEventsService.findOne(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateMeasurementEvent: Partial<MeasurmentEvent>,
  ) {
    return this.measurementEventsService
      .update(id, updateMeasurementEvent)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.measurementEventsService.remove(id).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }
}
