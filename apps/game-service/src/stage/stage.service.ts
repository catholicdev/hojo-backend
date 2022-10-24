import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { v4 as uuidv4 } from "uuid";

import { StageRepository, StageSettingRepository } from "@game/database/repositories";
import { CurrentGameRepository } from "@game/database/repositories/current-game.repository";
import { GameHelpEnum } from "@type";

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

    return {
      currentGame: {
        id: currentGame.id,
        helpUsed: currentGame.helpUsed,
        isPassed: currentGame.isPassed,
        isCompleted: currentGame.isCompleted,
      },
      nextStageId: stageSetting.nextStageId,
      stageHelps: stageSetting.helps,
    };
  }

  async useHelp(gameId: string, help: GameHelpEnum) {
    if (!gameId) throw new HttpException("incorrect-input", HttpStatus.BAD_REQUEST);

    const currentGame = await this.currentGameRepo.findOne({ where: { id: gameId } });
    if (!currentGame) throw new HttpException("game-notfound", HttpStatus.NOT_FOUND);

    if (currentGame.helpUsed && currentGame.helpUsed.includes(help))
      return new HttpException("duplicate-help", HttpStatus.BAD_REQUEST);

    this.currentGameRepo.merge(currentGame, { helpUsed: [...(currentGame.helpUsed ?? []), help] });
    await this.currentGameRepo.save(currentGame);

    return true;
  }
}
