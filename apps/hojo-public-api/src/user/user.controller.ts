import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserPasswordLoginDto } from "@dto";

import { UserService } from "@pub/user/user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly userService: UserService) {}

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

  // @Post("guest/daily-bible")
  // @UseGuards(GuestJwtAuthGuard)
  // @ApiOkResponse({ type: BibleSentenceResponse })
  // // @Serialize(BibleSentenceResponse)
  // async receiveDailyBible(@Guest() guest: GuestInterface) {
  //   const { userId } = guest;
  //   return this.usersService.receiveDailyBible(userId);
  // }
}
