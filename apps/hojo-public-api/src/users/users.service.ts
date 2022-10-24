import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { userServiceConsumer } from "@util";
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
    const result = await this.userServiceClient.post("user/guest/auth.login");
    return result.data;
  }

  async reloginGuest(userId: string, appId: string) {
    const result = await this.userServiceClient.post("user/guest/auth.relogin", { userId, appId });
    return result.data;
  }

  async receiveDailyBible(userId: string) {
    const result = await this.userServiceClient.post("user/daily-bible", { userId });
    return result.data;
  }
}
