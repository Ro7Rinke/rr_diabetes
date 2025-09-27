import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlucoseRecord } from './glucose-record.entity';
import { GlucoseService } from './glucose.service';
import { GlucoseController } from './glucose.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GlucoseRecord])],
  providers: [GlucoseService],
  controllers: [GlucoseController],
})
export class GlucoseModule {}