import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/Logger.middleware";

@Module({
  controllers: [],
  providers: [],
  exports: []
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}