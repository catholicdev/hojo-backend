import { Controller, Body, Post, Logger, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { GuestAuthGuard } from "@pub/auth/guards";
import { BibleSentenceResponse, UserPasswordLoginDto } from "@dto";

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

  @Post("guest/daily-bible")
  @UseGuards(GuestAuthGuard)
  @ApiOkResponse({ type: BibleSentenceResponse })
  async receiveDailyBible(@Body() payload) {
    const { id } = payload;
    return this.usersService.receiveDailyBible(id);
  }
}
