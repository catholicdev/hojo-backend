import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StageController } from "@game/stage/stage.controller";
import { StageService } from "@game/stage/stage.service";

import { CurrentGame, Stage, StageSetting } from "@game/database/entities";
import { StageRepository, StageSettingRepository, CurrentGameRepository } from "@game/database/repositories";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Stage,
      CurrentGame,
      StageSetting,
      StageRepository,
      CurrentGameRepository,
      StageSettingRepository,
    ]),
  ],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
