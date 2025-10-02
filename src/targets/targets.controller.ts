import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TargetsService } from './targets.service';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('targets')
export class TargetsController {
    constructor(
        private targetService: TargetsService
    ) { }

    @Post('new')
    async create(@Body() dto: CreateTargetDto, @Request() req) {
        return this.targetService.create(req.user, dto);
    }

    @Get() // pega o target do usuário logado
    async getUserTarget(@Request() req) {
        return this.targetService.getByUser(req.user);
    }

    @Put() // atualiza o target do usuário logado
    async updateUserTarget(@Request() req, @Body() dto: UpdateTargetDto) {
        return this.targetService.update(req.user, dto);
    }
}
