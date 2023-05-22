import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";

import { CreateUserDto, UserPasswordLoginDto } from "@dto";

import { UserTokenTypeEnum } from "@type";

import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";

@Controller("user")
export class UserController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly userAuthenService: UserAuthenService,
    private readonly userBibleService: UserBibleService
  ) {}

  @Get(":userId/daily-bible")
  async getDailyBible(@Param("userId") userId: string) {
    this.logger.log(`daily-bible: ${userId}`);
    return this.userBibleService.getDailyBible(userId);
  }

  @Post("login")
  async login(@Body() payload: UserPasswordLoginDto) {
    this.logger.log(`login: ${JSON.stringify(payload)}`);
    return this.userAuthenService.authenticateUserPassword(payload, UserTokenTypeEnum.CUSTOMER);
  }

  @Post("auth/verify-guest")
  async verifyGuest(@Body() payload) {
    this.logger.log(`verify-guest: ${JSON.stringify(payload)}`);
    const { id, appId } = payload;
    return this.userAuthenService.verifyGuest(id, appId);
  }

  @Post("weekly-bible")
  async weeklyBible(@Body() payload) {
    this.logger.log(`weekly-bible: ${JSON.stringify(payload)}`);
    const { userId } = payload;
    return this.userBibleService.weeklyBible(userId);
  }

  @Post("auth/verify-firebase-token")
  async verifyFirebaseToken(@Body() payload: { token: string }) {
    this.logger.log(`auth/verify-firebase-token: ${JSON.stringify(payload)}`);
    const { token } = payload;
    return this.userAuthenService.verifyFirebaseToken(token);
  }

  @Post("registration")
  async registerNewUser(@Body() payload: CreateUserDto) {
    this.logger.log(`registration: ${JSON.stringify(payload)}`);
    return this.userAuthenService.registerNewUser(payload);
  }

  @Post("verify-email")
  async verifyEmail(@Body() payload: { email: string }) {
    this.logger.log(`verify-email: ${JSON.stringify(payload)}`);
    return this.userAuthenService.verifyEmail(payload.email);
  }
}
