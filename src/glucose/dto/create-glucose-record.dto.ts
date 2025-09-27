import { IsInt, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { RecordContext } from '../glucose-record.entity';

export class CreateGlucoseRecordDto {
  @IsInt()
  value: number;

  @IsDateString()
  measuredAt: Date;

  @IsOptional()
  obs?: string;

  @IsEnum(RecordContext)
  context: RecordContext;
}