import { IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { RecordContext } from '../glucose-record.entity';

export class CreateGlucoseRecordDto {
  @IsNumber({}, { message: 'Value must be a number' })
  value: number;

  @IsDateString()
  measuredAt: Date;

  @IsOptional()
  obs?: string;

  @IsEnum(RecordContext)
  context: RecordContext;
}