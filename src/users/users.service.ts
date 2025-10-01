import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) { }

    async create(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10); // saltRounds = 10
        const user = this.usersRepo.create({
            ...dto,
            password: hashedPassword,
        });
        return this.usersRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } });
    }

    async requestPasswordReset(email: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await this.mailerService.sendMail(
            user.email,
            'Reset your password',
            `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        );

        return token;
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const payload = this.jwtService.verify(token);

            const user = await this.usersRepo.findOne({ where: { id: payload.sub } });
            if (!user) throw new Error('User not found');

            user.password = await bcrypt.hash(newPassword, 10);
            await this.usersRepo.save(user);

            return { message: 'Password reset successfully' };
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }
}