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
}
