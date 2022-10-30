import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StageController } from "@game/stage/stage.controller";
import { StageService } from "@game/stage/stage.service";

import { CurrentGame, EndGame, Stage, StageSetting } from "@game/database/entities";
import {
  StageRepository,
  StageSettingRepository,
  CurrentGameRepository,
  EndGameRepository,
} from "@game/database/repositories";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stage,
      CurrentGame,
      EndGame,
      StageSetting,
      StageRepository,
      CurrentGameRepository,
      StageSettingRepository,
      EndGameRepository,
    ]),
  ],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
