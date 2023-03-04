import { Controller, Post, Body, Param, Get, UseGuards, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Guest, Serialize, Swagger } from "@util";
import { GuestInterface } from "@type";

import { GuestJwtAuthGuard } from "@pub/auth/guards";
import { GameService } from "@pub/game/game.service";
import {
  StageQuestionResponse,
  UserHelpDto,
  GetRoundsResponse,
  GetStageResponse,
  GetBookResponse,
  GetTopThreeResponse,
  StartGameDto,
  StartGameResponse,
  EndGameDto,
  EndGameResponse,
} from "@dto";

@ApiTags("Game")
@Controller("game")
export class GameController {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly gameServivce: GameService) {}

  @Get("rounds")
  @Serialize(GetRoundsResponse)
  @Swagger({ response: [GetRoundsResponse] })
  async getRounds() {
    this.logger.log(`rounds`);

    return this.gameServivce.getRounds();
  }

  @Get(":roundId/stages")
  @Serialize(GetStageResponse)
  @Swagger({ response: [GetStageResponse] })
  async stages(@Param("roundId") roundId: string) {
    this.logger.log(`:roundId/stages: ${roundId}`);

    return this.gameServivce.getStages(roundId);
  }

  @Get(":stageId/get-book")
  @Serialize(GetBookResponse)
  @Swagger({ response: GetBookResponse })
  async getBook(@Param("stageId") stageId: string) {
    this.logger.log(`:stageId/get-book: ${stageId}`);

    return this.gameServivce.getBook(stageId);
  }

  @Get("get-top-three")
  @Serialize(GetTopThreeResponse)
  @Swagger({ response: [GetTopThreeResponse] })
  async getTopThree() {
    this.logger.log(`get-top-three`);

    return this.gameServivce.getTopThree();
  }

  @Get(":stageId/questions")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(StageQuestionResponse)
  @Swagger({ response: StageQuestionResponse, auth: "access-token" })
  async getStageQuestions(@Param("stageId") stageId: string) {
    this.logger.log(`:stageId/questions: ${stageId}`);

    return this.gameServivce.getStageQuestions(stageId);
  }

  @Post("guest/start-game")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(StartGameResponse)
  @Swagger({ body: StartGameDto, response: StartGameResponse, auth: "access-token" })
  async startGuestGame(@Guest() guest: GuestInterface, @Body() payload: StartGameDto) {
    this.logger.log(`guest/start-game: ${JSON.stringify(payload)}`);
    const { stageId } = payload;

    return this.gameServivce.startGame(guest.userId, stageId);
  }

  @Post("guest/use-help")
  @UseGuards(GuestJwtAuthGuard)
  @Swagger({ body: UserHelpDto, auth: "access-token" })
  async guestUseHelp(@Body() useHelp: UserHelpDto) {
    this.logger.log(`guest/use-help: ${JSON.stringify(useHelp)}`);

    return this.gameServivce.guestUseHelp(useHelp);
  }

  @Post("guest/end-game")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(EndGameResponse)
  @Swagger({ body: EndGameDto, response: EndGameResponse, auth: "access-token" })
  async guestEndGame(@Guest() guest: GuestInterface, @Body() payload: EndGameDto) {
    this.logger.log(`guest/end-game: ${JSON.stringify(payload)}`);

    return this.gameServivce.endGame({ ...payload, userId: guest.userId });
  }

  @Get("guest/:roundId/user-stages")
  @UseGuards(GuestJwtAuthGuard)
  @Swagger({ auth: "access-token" })
  async guestStages(@Guest() guest: GuestInterface, @Param("roundId") roundId: string) {
    this.logger.log(`guest/:roundId/user-stages: ${roundId}`);

    return this.gameServivce.getUserStages(roundId, guest.userId);
  }
}
