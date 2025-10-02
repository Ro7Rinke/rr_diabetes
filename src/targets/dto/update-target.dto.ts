import { IsOptional, IsNumber, Min, IsInt } from 'class-validator';

export class UpdateTargetDto {
  @IsOptional()
  @IsNumber({}, { message: 'Value must be a number' })
  @Min(0)
  value?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Tolerance must be a number' })
  @Min(0)
  tolerance?: number;

  @IsOptional()
  @IsInt({ message: 'Interval must be an int' })
  @Min(1)
  interval?: number;
}