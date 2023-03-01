import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { gameServiceConsumer } from "@util";
import { EndGameDto, UserHelpDto } from "@dto";

@Injectable()
export class GameService {
  private readonly gameServiceClient: AxiosInstance = gameServiceConsumer();

  async getRounds() {
    const result = await this.gameServiceClient.post("round/get-all");
    return result.data;
  }

  async getStages(roundId: string) {
    const result = await this.gameServiceClient.post("round/stages", { roundId });
    return result.data;
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
    const result = await this.gameServiceClient.post("stage/get-book", {
      stageId,
    });

    return result.data;
  }

  async getUserStages(roundId: string, userId: string) {
    const result = await this.gameServiceClient.post("round/user-stages", {
      roundId,
      userId,
    });

    return result.data;
  }
}
