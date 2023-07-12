import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { BibleSentenceResponse, UserPasswordLoginDto } from "@dto";

import { Serialize, User } from "@util";

import { AuthorizedUserInterface } from "@interfaces";

import { FirebaseAuthGuard } from "@pub/auth/guards";
import { UserService } from "@pub/user/user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("daily-bible")
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: BibleSentenceResponse })
  @Serialize(BibleSentenceResponse)
  async getDailyBible(@User() user: AuthorizedUserInterface) {
    const { userId } = user;
    return this.userService.getDailyBible(userId);
  }

  @Post("app/login")
  async loginApp(@Body() body: UserPasswordLoginDto) {
    return this.userService.loginApp(body);
  }

  @Post("app/register")
  async registerNewUser(@Body() body: any) {
    return this.userService.registerNewUser(body);
  }

  @Post("register/verify-email")
  async verifyEmail(@Body() body: any) {
    const { email } = body;
    return this.userService.verifyEmail(email);
  }
}
