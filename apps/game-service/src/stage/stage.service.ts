import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { v4 as uuidv4 } from "uuid";
import { AxiosInstance } from "axios";

import { GameHelpEnum, HeartLogTypeEnum } from "@type";
import { EndGameDto } from "@dto";
import { userServiceConsumer } from "@util";

import { EndGameRepository, StageRepository, StageSettingRepository } from "@game/database/repositories";
import { CurrentGameRepository } from "@game/database/repositories/current-game.repository";
@Injectable()
export class StageService {
  private readonly userServiceClient = userServiceConsumer() as AxiosInstance;

  constructor(
    private readonly stageRepo: StageRepository,
    private readonly currentGameRepo: CurrentGameRepository,
    private readonly stageSettingRepo: StageSettingRepository,
    private readonly endGameRepo: EndGameRepository
  ) {}

  async startGame(stageId: string, userId: string) {
    if (!userId || !stageId) throw new HttpException("incorrect-input", HttpStatus.BAD_REQUEST);

    const userHeart = await (await this.userServiceClient.post("heart/user-heart", { userId })).data;
    if (userHeart.heart <= 0) {
      throw new HttpException("invalid-heart", HttpStatus.BAD_REQUEST);
    }

    const stageSetting = await this.stageSettingRepo.findOne({ stageId });
    if (!stageSetting) throw new HttpException("missing-setting", HttpStatus.NOT_FOUND);

    let currentGame = await this.currentGameRepo.findOne({ userId, stageId });

    if (!currentGame) {
      const newGame = this.currentGameRepo.create({
        id: uuidv4(),
        userId,
        stageId,
        isCompleted: false,
        isPassed: false,
      });

      currentGame = await this.currentGameRepo.manager.save(newGame);
    }

    return {
      currentGame: {
        id: currentGame.id,
        helpUsed: currentGame.helpUsed ?? null,
        isPassed: currentGame.isPassed,
        isCompleted: currentGame.isCompleted,
      },
      stageHelps: stageSetting.helps,
    };
  }

  async useHelp(gameId: string, help: GameHelpEnum) {
    if (!gameId) throw new HttpException("incorrect-input", HttpStatus.BAD_REQUEST);

    const currentGame = await this.currentGameRepo.findOne({ where: { id: gameId } });
    if (!currentGame) throw new HttpException("game-notfound", HttpStatus.NOT_FOUND);

    if (currentGame.helpUsed && currentGame.helpUsed.includes(help))
      throw new HttpException("duplicate-help", HttpStatus.BAD_REQUEST);

    this.currentGameRepo.merge(currentGame, { helpUsed: [...(currentGame.helpUsed ?? []), help] });
    await this.currentGameRepo.save(currentGame);

    return true;
  }

  async endGame(data: EndGameDto) {
    const currentGame = await this.currentGameRepo.findOne(
      { id: data.gameId, userId: data.userId },
      { relations: ["endGame"] }
    );
    if (!currentGame) throw new HttpException("current-game-notfound", HttpStatus.NOT_FOUND);

    const endGameId = uuidv4();
    if (!currentGame.endGame) {
      const newEndGame = this.endGameRepo.create({
        id: endGameId,
        userId: data.userId,
        totalQuestionPassed: data.totalCorrectQuestion,
        totalScore: data.totalScore,
      });

      await this.endGameRepo.save(newEndGame);
    }

    this.currentGameRepo.update(
      { id: currentGame.id },
      {
        completedDate: new Date(),
        isCompleted: data.isCompleted,
        isPassed: data.isPassed,
        passedDate: data.isPassed ? new Date() : null,
        endGameId: endGameId,
      }
    );

    if (data.isPassed) {
      const stageSetting = await this.stageSettingRepo.findOne({ stageId: currentGame.stageId });
      if (!stageSetting) throw new HttpException("missing-setting", HttpStatus.NOT_FOUND);

      return {
        nextStageId: stageSetting.nextStageId,
      };
    }

    await this.userServiceClient.post("heart/update/user-heart", {
      userId: data.userId,
      quantity: -1,
      type: HeartLogTypeEnum.DECREASE,
    });

    return {
      nextStageId: currentGame.stageId,
    };
  }
}
