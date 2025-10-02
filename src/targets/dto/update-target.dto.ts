import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateTargetDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tolerance?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  interval?: number;
}