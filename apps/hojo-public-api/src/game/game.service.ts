import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { gameServiceConsumer } from "@util";

@Injectable()
export class GameService {
  private readonly gameServiceClient: AxiosInstance = gameServiceConsumer();

  async getStages(roundId: string) {
    const result = await this.gameServiceClient.post("game/round/stages", { roundId });
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
}
