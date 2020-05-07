import { Controller, Get, Req, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/req')
  findAll(@Req() request: Request): string {
    console.log(request.query);
    return `Test @Req() - ${request.query}`;
  }

  @Get('/q*ry')
  finddParam(@Query() params): string {
    console.log(params);
    return `Test @Param() - ${params}`;
  }
}
