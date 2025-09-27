import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        const user = await this.usersService.create(body.email, body.password);
        return { id: user.id, email: user.email };
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @Post('request-password-reset')
    async requestPasswordReset(@Body() body: { email: string }) {
        const token = await this.usersService.requestPasswordReset(body.email);
        return { message: 'Password reset link sent', token }; // token só pra dev/teste
    }

    @Post('reset-password')
    async resetPassword(@Body() body: { token: string; newPassword: string }) {
        const result = await this.usersService.resetPassword(body.token, body.newPassword);
        return result;
    }
}