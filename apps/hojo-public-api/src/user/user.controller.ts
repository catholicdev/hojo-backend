import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import {
  BibleSentenceResponse,
  CreateUserDto,
  LoginResponse,
  UserPasswordLoginDto,
  VerifyEmailDto,
  VerifyEmailResponse,
} from "@dto";

import { Serialize, Swagger, User } from "@util";

import { AuthorizedUserInterface } from "@interfaces";

import { FirebaseAuthGuard } from "@pub/auth/guards";
import { UserService } from "@pub/user/user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("daily-bible")
  @UseGuards(FirebaseAuthGuard)
  @Swagger({ response: BibleSentenceResponse, auth: "access-token" })
  @Serialize(BibleSentenceResponse)
  async getDailyBible(@User() user: AuthorizedUserInterface) {
    const { userId } = user;
    return this.userService.getDailyBible(userId);
  }

  @Get("check-token")
  @UseGuards(FirebaseAuthGuard)
  async checkToken() {
    return "Authorized";
  }

  @Post("app/login")
  @Swagger({ body: UserPasswordLoginDto, response: LoginResponse })
  async loginApp(@Body() body: UserPasswordLoginDto) {
    return this.userService.loginApp(body);
  }

  @Post("app/register")
  @Swagger({ body: CreateUserDto, response: LoginResponse })
  async registerNewUser(@Body() body: CreateUserDto) {
    return this.userService.registerNewUser(body);
  }

  @Post("register/verify-email")
  @Swagger({ body: VerifyEmailDto, response: VerifyEmailResponse })
  async verifyEmail(@Body() body: VerifyEmailDto) {
    const { email } = body;
    return this.userService.verifyEmail(email);
  }
}
