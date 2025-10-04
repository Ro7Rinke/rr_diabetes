import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { GlucoseService } from './glucose.service';
import { CreateGlucoseRecordDto } from './dto/create-glucose-record.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('glucose')
@UseGuards(JwtAuthGuard)
export class GlucoseController {
  constructor(private glucoseService: GlucoseService) {}

  @Post('record')
  async create(@Body() dto: CreateGlucoseRecordDto, @Request() req) {
    return this.glucoseService.create(req.user, dto);
  }

  @Get('record')
  async getAll(@Request() req) {
    return this.glucoseService.findAllByUser(req.user.id);
  }
}