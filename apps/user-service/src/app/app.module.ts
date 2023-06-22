import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { loggerMiddleware } from "@middlewares";

import { AppController } from "@user/app/app.controller";
import { AppService } from "@user/app/app.service";
import { DatabaseModule } from "@user/database/database.module";
import { HeartModule } from "@user/heart/heart.module";
import { UserModule } from "@user/user/user.module";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, UserModule, HeartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
