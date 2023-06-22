import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { loggerMiddleware } from "@middlewares";

import { AppController } from "@game/app/app.controller";
import { AppService } from "@game/app/app.service";
import { DatabaseModule } from "@game/database/database.module";
import { QuestionModule } from "@game/question/question.module";
import { RankingModule } from "@game/ranking/ranking.module";
import { RoundModule } from "@game/round/round.module";
import { StageModule } from "@game/stage/stage.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    DatabaseModule,
    StageModule,
    QuestionModule,
    RoundModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
