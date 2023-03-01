import { Controller, Body, Post, Logger, UseGuards, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { BibleSentenceResponse, WeeklyBibleRespone } from "@dto";
import { GuestInterface } from "@type";
import { Guest, Serialize } from "@util";

import { GuestJwtAuthGuard } from "@pub/auth/guards";
import { UsersService } from "@pub/users/users.service";

@ApiTags("Guest")
@Controller("guest")
export class GuestController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly usersService: UsersService) {}

  @Post("app/login")
  async loginGuest() {
    this.logger.log(`app/login`);

    return this.usersService.loginGuest();
  }

  @Post("app/relogin")
  async reloginGuest(@Body() payload) {
    this.logger.log(`app/relogin: ${JSON.stringify(payload)}`);
    const { userId, appId } = payload;

    return this.usersService.reloginGuest(userId, appId);
  }

  @Get("daily-bible")
  @UseGuards(GuestJwtAuthGuard)
  @ApiOkResponse({ type: BibleSentenceResponse })
  @Serialize(BibleSentenceResponse)
  async receiveDailyBible(@Guest() guest: GuestInterface) {
    this.logger.log(`daily-bible`);
    const { userId } = guest;

    return this.usersService.receiveDailyBible(userId);
  }

  @Get("weekly-bible")
  @UseGuards(GuestJwtAuthGuard)
  @ApiOkResponse({ type: Array<WeeklyBibleRespone> })
  @Serialize(WeeklyBibleRespone)
  async getWeekBible(@Guest() guest: GuestInterface) {
    this.logger.log(`weekly-bible`);
    const { userId } = guest;

    return await this.usersService.getWeekBible(userId);
  }
}
