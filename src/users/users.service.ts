import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) { }

    async create(email: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({ email, password: hash });
        return this.usersRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } });
    }

    async requestPasswordReset(email: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const token = uuidv4();
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600 * 1000);

        await this.usersRepo.save(user);

        // Send Mail Here
        // Ex: `${FRONTEND_URL}/reset-password?token=${token}`
        return token;
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await this.usersRepo.findOne({ where: { resetPasswordToken: token } });

        if (!user || (user.resetPasswordExpires && user.resetPasswordExpires < new Date())) {
            throw new Error('Token invalid or expired');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await this.usersRepo.save(user);
        return { message: 'Password reset successfully' };
    }
}