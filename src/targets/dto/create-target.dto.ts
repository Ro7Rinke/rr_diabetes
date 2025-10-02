import { IsInt, IsDecimal } from 'class-validator';

export class CreateTargetDto {
  @IsDecimal()
  value: number;

  @IsDecimal()
  tolerance: number;

  @IsInt()
  interval: number
}