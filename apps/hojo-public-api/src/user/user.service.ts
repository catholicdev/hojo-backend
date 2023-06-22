import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { UserPasswordLoginDto } from "@dto";

import { userServiceConsumer } from "@util";

@Injectable()
export class UserService {
  private readonly userServiceClient: AxiosInstance = userServiceConsumer();

  async loginApp(loginDTO: UserPasswordLoginDto) {
    return this.userServiceClient.post("user/login", {
      ...loginDTO,
    });
  }

  async loginGuest() {
    const result = await this.userServiceClient.post("user/guest/auth.login");
    return result.data;
  }

  async reloginGuest(userId: string, appId: string) {
    const result = await this.userServiceClient.post("user/guest/auth.relogin", { userId, appId });
    return result.data;
  }

  async getDailyBible(userId: string) {
    const result = await this.userServiceClient.get(`user/${userId}/daily-bible`);
    return result.data;
  }

  async getWeekBible(userId: string) {
    const result = await this.userServiceClient.post("user/weekly-bible", { userId });
    return result.data;
  }

  async registerNewUser(payload: any) {
    const result = await this.userServiceClient.post("user/registration", payload);
    return result.data;
  }

  async verifyEmail(email: string) {
    const result = await this.userServiceClient.post("user/verify-email", { email });
    return result.data;
  }
}
