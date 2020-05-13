import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/core/database/database.module';
import { DotHoursController } from './dothours.controller';
import { DotHoursService } from './dothours.service';
import { dothoursProviders } from './dothour.providers';
import { ParametersModule } from 'src/parameters/parameters.module';

@Module({
  imports: [DatabaseModule, ParametersModule],
  controllers: [DotHoursController],
  providers: [
    DotHoursService,
    ...dothoursProviders
  ],
  exports: []
})
export class DotHoursModule {}