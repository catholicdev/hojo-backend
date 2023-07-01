import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { EndGameDto, UserHelpDto } from "@dto";

import { gameServiceConsumer } from "@util";

@Injectable()
export class GameService {
  private readonly gameServiceClient: AxiosInstance = gameServiceConsumer();

  async getRounds() {
    return this.gameServiceClient.get("round/get-all");
  }

  async getStages(roundId: string) {
    return this.gameServiceClient.get(`round/${roundId}/stages`);
  }

  async startGame(userId: string, stageId: string) {
    const result = await this.gameServiceClient.post("stage/start-game", { stageId, userId });
    return result.data;
  }

  async getStageQuestions(stageId: string) {
    const result = await this.gameServiceClient.post("question/stage-questions", { stageId });
    return result.data;
  }

  async guestUseHelp(useHelp: UserHelpDto) {
    const result = await this.gameServiceClient.post("stage/use-help", { ...useHelp });
    return result.data;
  }

  async endGame(endGame: EndGameDto) {
    const result = await this.gameServiceClient.post("stage/end-game", { ...endGame });
    return result.data;
  }

  async getTopThree() {
    const result = await this.gameServiceClient.post("ranking/get-top-three");
    return result.data;
  }

  async getBook(stageId: string) {
    return this.gameServiceClient.get(`stage/${stageId}/get-book`);
  }

  async getUserStages(roundId: string, userId: string) {
    const result = await this.gameServiceClient.post("round/user-stages", {
      roundId,
      userId,
    });

    return result.data;
  }
}
