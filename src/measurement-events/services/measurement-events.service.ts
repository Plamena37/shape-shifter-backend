import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeasurmentEvent } from '../models/measurement-event.model';
import { Model } from 'mongoose';
import { MeasurmentEventDocument } from '../schemas/measurement-event.schema';

@Injectable()
export class MeasurementEventsService {
  constructor(
    @InjectModel(MeasurmentEvent.name)
    private measurementEventModel: Model<MeasurmentEventDocument>,
  ) {}

  async create(
    createMeasurementEvent: MeasurmentEvent,
    userId: string,
  ): Promise<MeasurmentEvent> {
    const createdMeasurementEvent = new this.measurementEventModel({
      ...createMeasurementEvent,
      userId,
    });

    return await createdMeasurementEvent.save();
  }

  async findByUser(userId: string): Promise<MeasurmentEvent[]> {
    return this.measurementEventModel
      .find({ userId: { $eq: userId } })
      .sort({ date: 1 });
  }

  async findOne(id: string): Promise<MeasurmentEvent> {
    return this.measurementEventModel.findById(id);
  }

  async update(
    id: string,
    updateMeasurementEvent: Partial<MeasurmentEvent>,
  ): Promise<MeasurmentEvent> {
    return this.measurementEventModel.findByIdAndUpdate(
      id,
      updateMeasurementEvent,
      { new: true },
    );
  }

  async remove(id: string): Promise<MeasurmentEvent> {
    const existingMeasurementEvent = await this.measurementEventModel.findById(
      id,
    );
    if (!existingMeasurementEvent) {
      throw new Error('Measurement event not found');
    }

    return this.measurementEventModel.findByIdAndRemove(id);
  }
}
