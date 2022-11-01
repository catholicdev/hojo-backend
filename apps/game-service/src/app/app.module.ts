import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@game/app/app.controller";
import { AppService } from "@game/app/app.service";

import { DatabaseModule } from "@game/database/database.module";
import { StageModule } from "@game/stage/stage.module";
import { QuestionModule } from "@game/question/question.module";
import { RoundModule } from "@game/round/round.module";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, StageModule, QuestionModule, RoundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
