import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import { loggerMiddleware } from "@middlewares";

import { AppController } from "@pub/app/app.controller";
import { AppService } from "@pub/app/app.service";
import { AuthModule } from "@pub/auth/auth.module";
import { BibleModule } from "@pub/bible/bible.module";
import { GameModule } from "@pub/game/game.module";
import { UserModule } from "@pub/user/user.module";

@Module({
  imports: [AuthModule, UserModule, BibleModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
