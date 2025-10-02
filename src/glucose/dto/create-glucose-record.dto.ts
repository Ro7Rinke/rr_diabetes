import { IsOptional, IsEnum, IsDateString, IsDecimal } from 'class-validator';
import { RecordContext } from '../glucose-record.entity';

export class CreateGlucoseRecordDto {
  @IsDecimal()
  value: number;

  @IsDateString()
  measuredAt: Date;

  @IsOptional()
  obs?: string;

  @IsEnum(RecordContext)
  context: RecordContext;
}