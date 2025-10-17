import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { 
        expiresIn: String(process.env.JWT_EXPIRES_IN || '1h')
      },
    }),
  ],
  providers: [UsersService, MailerService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}