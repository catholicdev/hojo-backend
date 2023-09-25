import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import {
  EndGameResponse,
  GetBookResponse,
  GetRankingResponse,
  GetRoundsResponse,
  GetStageResponse,
  PublicEndGameDto,
  StageQuestionResponse,
  StartGameDto,
  StartGameResponse,
  UserHelpDto,
  UserStageResponse,
} from "@dto";

import { Serialize, Swagger, User } from "@util";

import { AuthorizedUserInterface } from "@interfaces";

import { FirebaseAuthGuard } from "@pub/auth/guards";
import { GameService } from "@pub/game/game.service";

@ApiTags("Game")
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("rounds")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: [GetRoundsResponse], auth: "access-token" })
  async getRounds() {
    return this.gameService.getRounds();
  }

  @Get(":roundId/stages")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: [GetStageResponse], auth: "access-token" })
  async stages(@Param("roundId") roundId: string) {
    return this.gameService.getStages(roundId);
  }

  @Get(":stageId/get-book")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: GetBookResponse, auth: "access-token" })
  async getBook(@Param("stageId") stageId: string) {
    return this.gameService.getBook(stageId);
  }

  @Get("get-top-of-week")
  @Swagger({ response: GetRankingResponse })
  async getTopWeek() {
    return this.gameService.getTopOfWeek();
  }

  @Get("get-top-of-game")
  @Swagger({ response: GetRankingResponse })
  async getTopOfGame() {
    return this.gameService.getTopOfGame();
  }

  @Get(":stageId/questions")
  @UseGuards(FirebaseAuthGuard)
  @Serialize(StageQuestionResponse)
  @Swagger({ response: StageQuestionResponse, auth: "access-token" })
  async getStageQuestions(@Param("stageId") stageId: string) {
    return this.gameService.getStageQuestions(stageId);
  }

  @Post("start-game")
  @UseGuards(FirebaseAuthGuard)
  @Serialize(StartGameResponse)
  @Swagger({ body: StartGameDto, response: StartGameResponse, auth: "access-token" })
  async startGame(@User() user: AuthorizedUserInterface, @Body() payload: StartGameDto) {
    const { stageId } = payload;

    return this.gameService.startGame(user.userId, stageId);
  }

  @Post("use-help")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ body: UserHelpDto, auth: "access-token" })
  async useHelp(@Body() useHelp: UserHelpDto) {
    return this.gameService.useHelp(useHelp);
  }

  @Post("end-game")
  @UseGuards(FirebaseAuthGuard)
  @Serialize(EndGameResponse)
  @Swagger({ body: PublicEndGameDto, response: EndGameResponse, auth: "access-token" })
  async endGame(@User() user: AuthorizedUserInterface, @Body() payload: PublicEndGameDto) {
    return this.gameService.endGame({ ...payload, userId: user.userId });
  }

  @Get(":roundId/user-stages")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ auth: "access-token", response: [UserStageResponse] })
  async userStages(@User() user: AuthorizedUserInterface, @Param("roundId") roundId: string) {
    return this.gameService.getUserStages(roundId, user.userId);
  }
}
