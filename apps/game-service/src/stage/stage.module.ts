import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StageController } from "@game/stage/stage.controller";
import { StageService } from "@game/stage/stage.service";

import { CurrentGame, GameResult, Stage, StageSetting } from "@game/database/entities";
import {
  StageRepository,
  StageSettingRepository,
  CurrentGameRepository,
  GameResultRepository,
} from "@game/database/repositories";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stage,
      CurrentGame,
      GameResult,
      StageSetting,
      StageRepository,
      CurrentGameRepository,
      StageSettingRepository,
      GameResultRepository,
    ]),
  ],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
