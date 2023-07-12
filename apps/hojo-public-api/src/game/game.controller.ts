import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import {
  EndGameDto,
  EndGameResponse,
  GetBookResponse,
  GetRoundsResponse,
  GetStageResponse,
  GetTopThreeResponse,
  StageQuestionResponse,
  StartGameDto,
  StartGameResponse,
  UserHelpDto,
} from "@dto";

import { Serialize, Swagger, User } from "@util";

import { AuthorizedUserInterface } from "@interfaces";

import { FirebaseAuthGuard, GuestJwtAuthGuard } from "@pub/auth/guards";
import { GameService } from "@pub/game/game.service";

@ApiTags("Game")
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("rounds")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: [GetRoundsResponse] })
  async getRounds() {
    return this.gameService.getRounds();
  }

  @Get(":roundId/stages")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: [GetStageResponse] })
  async stages(@Param("roundId") roundId: string) {
    return this.gameService.getStages(roundId);
  }

  @Get(":stageId/get-book")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: GetBookResponse })
  async getBook(@Param("stageId") stageId: string) {
    return this.gameService.getBook(stageId);
  }

  @Get("get-top-three")
  @Serialize(GetTopThreeResponse)
  @Swagger({ response: [GetTopThreeResponse] })
  async getTopThree() {
    return this.gameService.getTopThree();
  }

  @Get(":stageId/questions")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(StageQuestionResponse)
  @Swagger({ response: StageQuestionResponse, auth: "access-token" })
  async getStageQuestions(@Param("stageId") stageId: string) {
    return this.gameService.getStageQuestions(stageId);
  }

  @Post("guest/start-game")
  @UseGuards(FirebaseAuthGuard)
  @Serialize(StartGameResponse)
  @Swagger({ body: StartGameDto, response: StartGameResponse, auth: "access-token" })
  async startGuestGame(@User() user: AuthorizedUserInterface, @Body() payload: StartGameDto) {
    const { stageId } = payload;

    return this.gameService.startGame(user.userId, stageId);
  }

  @Post("guest/use-help")
  @UseGuards(GuestJwtAuthGuard)
  @Swagger({ body: UserHelpDto, auth: "access-token" })
  async guestUseHelp(@Body() useHelp: UserHelpDto) {
    return this.gameService.guestUseHelp(useHelp);
  }

  @Post("guest/end-game")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(EndGameResponse)
  @Swagger({ body: EndGameDto, response: EndGameResponse, auth: "access-token" })
  async guestEndGame(@User() user: AuthorizedUserInterface, @Body() payload: EndGameDto) {
    return this.gameService.endGame({ ...payload, userId: user.userId });
  }

  @Get("guest/:roundId/user-stages")
  @UseGuards(GuestJwtAuthGuard)
  @Swagger({ auth: "access-token" })
  async guestStages(@User() user: AuthorizedUserInterface, @Param("roundId") roundId: string) {
    return this.gameService.getUserStages(roundId, user.userId);
  }
}
