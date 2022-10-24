import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { v4 as uuidv4 } from "uuid";

import { StageRepository, StageSettingRepository } from "@game/database/repositories";
import { CurrentGameRepository } from "@game/database/repositories/current-game.repository";

@Injectable()
export class StageService {
  constructor(
    private readonly stageRepo: StageRepository,
    private readonly currentGameRepo: CurrentGameRepository,
    private readonly stageSettingRepo: StageSettingRepository
  ) {}

  async startGame(stageId: string, userId: string) {
    if (!userId || !stageId) throw new HttpException("incorrect-input", HttpStatus.BAD_REQUEST);

    const stageSetting = await this.stageSettingRepo.findOne({ where: { stageId } });
    if (!stageSetting) throw new HttpException("missing-setting", HttpStatus.NOT_FOUND);

    let currentGame = await this.currentGameRepo.findOne({ where: { userId, stageId } });
    if (!currentGame) {
      const newGame = this.currentGameRepo.create({
        id: uuidv4(),
        userId,
        stageId,
        isCompleted: false,
        isPassed: false,
      });

      await this.currentGameRepo.insert(newGame);

      currentGame = newGame;
    }

    return { currentGame, nextStageId: stageSetting.nextStageId, stageHelps: stageSetting.helps };
  }
}
