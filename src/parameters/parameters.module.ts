import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { parametersProviders } from './parameter.providers';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';


@Module({
  imports: [DatabaseModule],
  controllers: [ParametersController],
  providers: [
    ParametersService,
    ...parametersProviders
  ],
  exports: [ParametersService]
})
export class ParametersModule {}