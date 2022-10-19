import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { userServiceConsumer } from "@utils";
import { UserPasswordLoginDto } from "@dto";

@Injectable()
export class UsersService {
  private readonly userServiceClient: AxiosInstance = userServiceConsumer();

  async loginApp(loginDTO: UserPasswordLoginDto) {
    const result = await this.userServiceClient.post("user/login", {
      ...loginDTO,
    });
    return result.data;
  }

  async loginGuest() {
    const result = await this.userServiceClient.post("user/guest");

    return result.data;
  }

  async receiveDailyBible(userId: string) {
    const result = await this.userServiceClient.post("user/daily-bible", { userId });

    return result.data;
  }
}
