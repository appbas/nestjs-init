import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/Logger.middleware';
import { UsersModule } from 'src/users/users.module';
import { DotHoursModule } from 'src/dothours/dothours.module';
import { AuthModule } from './auth/auth.module';
import { ParametersModule } from 'src/parameters/parameters.module';

@Module({
  imports: [AuthModule, UsersModule, DotHoursModule, ParametersModule],
  exports: [AuthModule, UsersModule],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'api/v1', method: RequestMethod.ALL });
  }
}
