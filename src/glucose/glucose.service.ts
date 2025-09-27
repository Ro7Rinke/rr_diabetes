import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlucoseRecord } from './glucose-record.entity';
import { CreateGlucoseRecordDto } from './dto/create-glucose-record.dto';
import { User } from '../users/user.entity';

@Injectable()
export class GlucoseService {
  constructor(
    @InjectRepository(GlucoseRecord)
    private glucoseRepo: Repository<GlucoseRecord>,
  ) {}

  async create(user: User, dto: CreateGlucoseRecordDto) {
    const reading = this.glucoseRepo.create({ ...dto, user });
    return this.glucoseRepo.save(reading);
  }

  async findAllByUser(userId: string) {
    return this.glucoseRepo.find({
      where: { user: { id: userId } },
      order: { measuredAt: 'DESC' },
    });
  }
}