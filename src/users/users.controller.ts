import { Controller, Get, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user?.id)

    if (!user) throw new UnauthorizedException()

    return this.usersService.toSafeUser(user)
  }
}
