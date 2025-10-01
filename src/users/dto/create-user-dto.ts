import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  role?: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Primeiro nome é obrigatório' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Último nome é obrigatório' })
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string;
}