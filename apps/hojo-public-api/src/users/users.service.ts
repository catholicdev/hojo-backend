import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { userServiceConsumer } from "@utils";
import { UserPasswordLoginDto } from "@dto";

@Injectable()
export class UsersService {
  private readonly userService = userServiceConsumer() as AxiosInstance;

  async loginApp(loginDTO: UserPasswordLoginDto) {
    const result = await this.userService.post("user/login", {
      ...loginDTO,
    });
    return result.data;
  }

  async loginGuest() {
    const result = await this.userService.post("user/guest");

    return result.data;
  }
}
