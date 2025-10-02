import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from './target.entity';
import { Repository } from 'typeorm';
import { CreateTargetDto } from './dto/create-target.dto';
import { User } from 'src/users/user.entity';
import { UpdateTargetDto } from './dto/update-target.dto';

@Injectable()
export class TargetsService {
    constructor(
        @InjectRepository(Target)
        private targetsRepo: Repository<Target>
    ) { }

    async create(user: User, dto: CreateTargetDto) {
        const target = this.targetsRepo.create({ ...dto, user });
        return this.targetsRepo.save(target);
    }

    async getByUser(user: User) {
        return this.targetsRepo.findOne({ where: { user: { id: user.id } } });
    }

    async update(user: User, dto: UpdateTargetDto) {
        const target = await this.getByUser(user);
        if (!target) throw new Error('Target not found');

        Object.assign(target, dto);
        return this.targetsRepo.save(target);
    }
}
