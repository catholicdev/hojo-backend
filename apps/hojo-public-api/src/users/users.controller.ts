import { Controller, Body, Post, Logger } from "@nestjs/common";

import { UsersService } from "@pub/users/users.service";
import { UserPasswordLoginDto } from "@dto";

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
    this.logger.log(`Start Guest Login`);
    return this.usersService.loginGuest();
  }

  @Post("daily/bible")
  async receiveDailyBible(@Body() payload) {
    this.logger.log(`Start get Daily Bible`);
    const { userId } = payload;
    return this.usersService.receiveDailyBible(userId);
  }
}
