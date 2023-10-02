import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { EndGameDto, UserHelpDto } from "@dto";

import { gameServiceConsumer } from "@util";

@Injectable()
export class GameService {
  private readonly gameServiceClient: AxiosInstance = gameServiceConsumer();

  async getRounds() {
    return this.gameServiceClient.get("round");
  }

  async getStages(roundId: string) {
    return this.gameServiceClient.get(`round/${roundId}/stages`);
  }

  async startGame(userId: string, stageId: string) {
    return this.gameServiceClient.post("stage/start-game", { stageId, userId });
  }

  async getStageQuestions(stageId: string) {
    return this.gameServiceClient.post("question/stage-questions", { stageId });
  }

  async useHelp(useHelp: UserHelpDto) {
    return this.gameServiceClient.post("stage/use-help", { ...useHelp });
  }

  async endGame(endGame: EndGameDto) {
    return this.gameServiceClient.post("stage/end-game", { ...endGame });
  }

  async getTopThree() {
    return this.gameServiceClient.post("ranking/get-top-three");
  }

  async getBook(stageId: string) {
    return this.gameServiceClient.get(`stage/${stageId}/get-book`);
  }

  async getUserStages(roundId: string, userId: string) {
    return this.gameServiceClient.post("round/user-stages", {
      roundId,
      userId,
    });
  }
}
