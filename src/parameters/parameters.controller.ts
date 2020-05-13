import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ParametersService } from './parameters.service';

@UseGuards(JwtAuthGuard)
@Controller('parameters')
export class ParametersController {

  constructor(private readonly parametersService: ParametersService) {}

  @Get(':codParameter')
  async get(@Param('codParameter') codParameter) {
    return this.parametersService.getByCod(codParameter);
  }

}