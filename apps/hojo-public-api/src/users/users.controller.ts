import { Controller, Body, Post, Logger, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { BibleSentenceResponse, UserPasswordLoginDto } from "@dto";
import { GuestInterface } from "@type";
import { Guest, Serialize } from "@util";

import { GuestJwtAuthGuard } from "@pub/auth/guards";
import { UsersService } from "@pub/users/users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly usersService: UsersService) {}

  @Post("app/login")
  async loginApp(@Body() userPasswordLoginDto: UserPasswordLoginDto) {
    return this.usersService.loginApp(userPasswordLoginDto);
  }

  @Post("app/guest")
  async loginGuest() {
    return this.usersService.loginGuest();
  }

  @Post("app/relogin-guest")
  async reloginGuest() {
    return this.usersService.loginGuest();
  }

  @Post("guest/daily-bible")
  @UseGuards(GuestJwtAuthGuard)
  @ApiOkResponse({ type: BibleSentenceResponse })
  // @Serialize(BibleSentenceResponse)
  async receiveDailyBible(@Guest() guest: GuestInterface) {
    const { userId } = guest;
    return this.usersService.receiveDailyBible(userId);
  }
}
