import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { CreateUserDto, UserPasswordLoginDto } from "@dto";

import { UserTokenTypeEnum } from "@type";

import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userAuthenService: UserAuthenService,
    private readonly userBibleService: UserBibleService
  ) {}

  @Get(":userId/daily-bible")
  async getDailyBible(@Param("userId") userId: string) {
    return this.userBibleService.getDailyBible(userId);
  }

  @Post("login")
  async login(@Body() payload: UserPasswordLoginDto) {
    return this.userAuthenService.authenticateUserPassword(payload, UserTokenTypeEnum.GAMER);
  }

  @Post("weekly-bible")
  async weeklyBible(@Body() payload) {
    const { userId } = payload;
    return this.userBibleService.weeklyBible(userId);
  }

  @Post("auth/verify-firebase-token")
  async verifyFirebaseToken(@Body() payload: { token: string }) {
    const { token } = payload;
    return this.userAuthenService.verifyFirebaseToken(token);
  }

  @Post("registration")
  async registerNewUser(@Body() payload: CreateUserDto) {
    return this.userAuthenService.registerNewUser(payload);
  }

  @Post("verify-email")
  async verifyEmail(@Body() payload: { email: string }) {
    return this.userAuthenService.verifyEmail(payload.email);
  }
}
