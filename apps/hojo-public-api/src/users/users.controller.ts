import { Controller, Body, Post } from "@nestjs/common";

import { UsersService } from "@pub/users/users.service";
import { UserPasswordLoginDto } from "@dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("app/login")
  async loginApp(@Body() userPasswordLoginDto: UserPasswordLoginDto) {
    return this.usersService.loginApp(userPasswordLoginDto);
  }

  @Post("app/guest")
  async loginGuest() {
    return this.usersService.loginGuest();
  }
}
