import { Module } from '@nestjs/common';
import { TargetsService } from './targets.service';
import { TargetsController } from './targets.controller';
import { Target } from './target.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Target]),
  ],
  providers: [TargetsService],
  controllers: [TargetsController]
})
export class TargetsModule {}
