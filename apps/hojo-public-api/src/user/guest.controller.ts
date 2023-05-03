import { Body, Controller, Get, Logger, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import {
  BibleSentenceResponse,
  GuestLoginResponse,
  GuestReloginDto,
  GuestReloginResponse,
  WeeklyBibleRespone,
} from "@dto";

import { Guest, Serialize, Swagger } from "@util";

import { GuestInterface } from "@interfaces";

import { GuestJwtAuthGuard } from "@pub/auth/guards";
import { UserService } from "@pub/user/user.service";

@ApiTags("Guest")
@Controller("guest")
export class GuestController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly usersService: UserService) {}

  @Post("app/login")
  @Serialize(GuestLoginResponse)
  @Swagger({ response: GuestLoginResponse })
  async loginGuest() {
    this.logger.log(`app/login`);

    return this.usersService.loginGuest();
  }

  @Post("app/relogin")
  @Serialize(GuestReloginResponse)
  @Swagger({ body: GuestReloginDto, response: GuestReloginResponse })
  async reloginGuest(@Body() payload: GuestReloginDto) {
    this.logger.log(`app/relogin: ${JSON.stringify(payload)}`);
    const { userId, appId } = payload;

    return this.usersService.reloginGuest(userId, appId);
  }

  @Get("daily-bible")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(BibleSentenceResponse)
  @Swagger({ response: BibleSentenceResponse, auth: "access-token" })
  async receiveDailyBible(@Guest() guest: GuestInterface) {
    this.logger.log(`daily-bible`);
    const { userId } = guest;

    return this.usersService.receiveDailyBible(userId);
  }

  @Get("weekly-bible")
  @UseGuards(GuestJwtAuthGuard)
  @Serialize(WeeklyBibleRespone)
  @Swagger({ response: [WeeklyBibleRespone], auth: "access-token" })
  async getWeekBible(@Guest() guest: GuestInterface) {
    this.logger.log(`weekly-bible`);
    const { userId } = guest;

    return await this.usersService.getWeekBible(userId);
  }
}
