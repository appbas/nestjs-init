import { Controller, UseGuards, Request, Get, Query, Param, Post, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DotHoursService } from './dothours.service';
import { LocalAuthGuard } from 'src/core/auth/guards/local-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dot-hours')
export class DotHoursController {

  constructor(private readonly dotHoursService: DotHoursService) {}

  @Get()
  async get(@Request() req, @Query('dateReference') date) {
    return { registers: await this.dotHoursService.listDotHoursByMonth(req.user.iduser, date) };
  }

  @Post()
  async registerDotHour(@Request() req, @Body('date') dateHour) {
    await this.dotHoursService.registerDotHour(req.user.iduser, dateHour);
  }

  @Get('times-balances/:dateReference')
  async getTimeBalance(@Request() req, @Param('dateReference') dateReference) {
    return { result: await this.dotHoursService.getTimeBalance(req.user.iduser, dateReference) }
  }

  @Delete(':date')
  async clearDay(@Request() req, @Param('date') date) {

    this.dotHoursService.clearDay(req.user.iduser, date);

    return { result: 'Horários removidos com sucesso' }
  }

}