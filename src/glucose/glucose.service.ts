import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { GlucoseRecord } from './glucose-record.entity';
import { CreateGlucoseRecordDto } from './dto/create-glucose-record.dto';
import { User } from '../users/user.entity';
import { Target } from 'src/targets/target.entity';

@Injectable()
export class GlucoseService {
  constructor(
    @InjectRepository(GlucoseRecord)
    private glucoseRepo: Repository<GlucoseRecord>,
    @InjectRepository(Target)
    private targetRepo: Repository<Target>,
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

  async getAverageForUser(user: User) {
    const target = await this.targetRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!target) {
      throw new NotFoundException('Nenhuma meta encontrada para este usuário.');
    }

    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - target.interval);

    const records = await this.glucoseRepo.find({
      where: {
        user: { id: user.id },
        measuredAt: Between(startDate, now),
      },
      order: { measuredAt: 'DESC' },
    });

    if (records.length === 0) {
      return {
        average: null,
        count: 0,
        records: [],
        periodDays: target.interval,
      };
    }

    const average =
      records.reduce((sum, r) => sum + Number(r.value), 0) / records.length;

    return {
      average: parseFloat(average.toFixed(1)),
      count: records.length,
      interval: target.interval,
      from: startDate,
      to: now,
      records,
    };
  }
}