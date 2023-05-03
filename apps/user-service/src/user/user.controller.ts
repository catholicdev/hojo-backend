import { Body, Controller, Logger, Post } from "@nestjs/common";

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

  @Post("login")
  async login(@Body() payload: UserPasswordLoginDto) {
    this.logger.log(`login: ${JSON.stringify(payload)}`);
    return this.userAuthenService.authenticateUserPassword(payload, UserTokenTypeEnum.CUSTOMER);
  }

  @Post("guest/auth.login")
  async loginGuest() {
    this.logger.log(`guest/auth.login: start guest login`);
    return this.userAuthenService.loginGuest();
  }

  @Post("guest/auth.relogin")
  async reloginGuest(@Body() message) {
    this.logger.log(`guest/auth.relogin: ${JSON.stringify(message)}`);
    const { userId, appId } = message;
    return this.userAuthenService.reloginGuest(userId, appId);
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

  @Post("weekly-bible")
  async weeklyBible(@Body() payload) {
    this.logger.log(`weekly-bible: ${JSON.stringify(payload)}`);
    const { userId } = payload;
    return this.userBibleService.weeklyBible(userId);
  }

  @Post("guest/auth.verify-token")
  async validateToken(@Body() messase) {
    this.logger.log(`guest/auth.verify-token: ${JSON.stringify(messase)}`);
    const { token } = messase;
    return this.userAuthenService.verifyGuestToken(token);
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
