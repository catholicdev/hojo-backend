import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { userServiceConsumer } from "@utils";
import { UserPasswordLoginDto } from "@types";

@Injectable()
export class UsersService {
  private readonly userService = userServiceConsumer() as AxiosInstance;

  async loginApp(loginDTO: UserPasswordLoginDto) {
    const result = await this.userService.post("user/login", {
      ...loginDTO,
    });
    return result.data;
  }
}
