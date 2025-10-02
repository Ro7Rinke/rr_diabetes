import { IsInt, IsNumber } from 'class-validator';

export class CreateTargetDto {
  @IsNumber({}, { message: 'Value must be a number' })
  value: number;

  @IsNumber({}, { message: 'Tolerance must be a number' })
  tolerance: number;

  @IsInt()
  interval: number
}