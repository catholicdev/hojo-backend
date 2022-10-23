import { Body, Controller, Post, Logger } from "@nestjs/common";

import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";

@Controller("user")
export class UserController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly userAuthenService: UserAuthenService,
    private readonly userBibleService: UserBibleService
  ) {}

  @Post("login")
  async login(@Body() payload) {
    this.logger.log(`login: ${JSON.stringify(payload)}`);
    const { email, password } = payload;
    return this.userAuthenService.authenticateUserPassword(email, password);
  }

  @Post("guest")
  async guest() {
    this.logger.log(`guest: start guest login`);
    return this.userAuthenService.loginGuest();
  }

  @Post("auth/verify-guest")
  async verifyGuest(@Body() payload) {
    this.logger.log(`verify-guest: ${JSON.stringify(payload)}`);
    const { id, appId } = payload;
    return this.userAuthenService.verifyGuest(id, appId);
  }

  @Post("daily-bible")
  async dailyBible(@Body() payload) {
    this.logger.log(`daily-bible: ${JSON.stringify(payload)}`);
    const { userId } = payload;
    return this.userBibleService.dailyBible(userId);
  }

  @Post("guest/auth.verify-token")
  async validateToken(@Body() messase) {
    this.logger.log(`guest/auth.verify-token: ${JSON.stringify(messase)}`);
    const { token } = messase;
    return this.userAuthenService.verifyGuestToken(token);
  }
}
