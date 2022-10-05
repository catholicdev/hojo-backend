import { Body, Controller, Post } from "@nestjs/common";

import { UserAuthenService } from "@user/user/user.authen.service";

@Controller("user")
export class UserController {
  constructor(private readonly userAuthenService: UserAuthenService) {}

  @Post("login")
  async login(@Body() payload) {
    const { email, password } = payload;
    return this.userAuthenService.authenticateUserPassword(email, password);
  }
}
