import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { v4 as uuidv4 } from "uuid";
import { AxiosInstance } from "axios";
import * as shortid from "short-uuid";

import { GameHelpEnum, HeartLogTypeEnum } from "@type";
import { EndGameDto } from "@dto";
import { userServiceConsumer, bibleServiceConsumer } from "@util";

import { GameResultRepository, StageRepository, StageSettingRepository } from "@game/database/repositories";
import { CurrentGameRepository } from "@game/database/repositories/current-game.repository";
@Injectable()
export class StageService {
  private readonly userServiceClient = userServiceConsumer() as AxiosInstance;
  private readonly bibleServiceClient = bibleServiceConsumer() as AxiosInstance;

  constructor(
    private readonly stageRepo: StageRepository,
    private readonly currentGameRepo: CurrentGameRepository,
    private readonly stageSettingRepo: StageSettingRepository,
    private readonly gameResultRepo: GameResultRepository
  ) {}

  async startGame(stageId: string, userId: string) {
    if (!userId || !stageId) throw new HttpException("incorrect-input", HttpStatus.BAD_REQUEST);

    const userHeart = await (await this.userServiceClient.post("heart/user-heart", { userId })).data;
    if (userHeart.heart <= 0) {
      throw new HttpException("invalid-heart", HttpStatus.BAD_REQUEST);
    }

    const stage = await this.stageRepo.findOne({ id: stageId }, { relations: ["stageSetting"] });
    if (!stage.stageSetting) throw new HttpException("missing-setting", HttpStatus.NOT_FOUND);

    let currentGame = await this.currentGameRepo.findOne({ userId, stageId });

    if (!currentGame) {
      const newGame = this.currentGameRepo.create({
        id: uuidv4(),
        userId,
        stageId,
        isCompleted: false,
        isPassed: false,
        code: shortid.generate(),
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
      stageHelps: stage.stageSetting.helps,
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
  }

  async endGame(data: EndGameDto) {
    const currentGame = await this.currentGameRepo.findOne({ id: data.gameId, userId: data.userId });
    if (!currentGame) throw new HttpException("current-game-notfound", HttpStatus.NOT_FOUND);

    const gameResult = await this.gameResultRepo.findOne({ userId: data.userId, gameCode: currentGame.code });

    if (!gameResult) {
      const newEndGame = this.gameResultRepo.create({
        userId: data.userId,
        totalQuestionPassed: data.totalCorrectQuestion,
        totalScore: data.totalScore,
        gameCode: currentGame.code,
      });

      await this.gameResultRepo.save(newEndGame);
    }

    this.currentGameRepo.update(
      { id: currentGame.id },
      {
        completedDate: new Date(),
        isCompleted: data.isCompleted,
        isPassed: data.isPassed,
        passedDate: data.isPassed ? new Date() : null,
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

  async getBookByStage(stageId: string) {
    const { bookId } = await this.stageRepo.findOne({
      select: ["bookId"],
      where: {
        id: stageId,
      },
    });

    if (!bookId) throw new HttpException("Notfound-Book", HttpStatus.NOT_FOUND);

    const result = await this.bibleServiceClient.post("chapter/get-chapter-book", {
      bookId,
    });

    return result.data;
  }
}
