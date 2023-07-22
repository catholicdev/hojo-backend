import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { UserPasswordLoginDto } from "@dto";

import { userServiceConsumer } from "@util";

@Injectable()
export class UserService {
  private readonly userServiceClient: AxiosInstance = userServiceConsumer();

  async loginApp(loginDTO: UserPasswordLoginDto) {
    return this.userServiceClient.post("user/login", loginDTO);
  }

  async getDailyBible(userId: string) {
    return this.userServiceClient.get(`user/${userId}/daily-bible`);
  }

  async getWeekBible(userId: string) {
    return this.userServiceClient.post("user/weekly-bible", { userId });
  }

  async registerNewUser(payload: any) {
    return this.userServiceClient.post("user/registration", payload);
  }

  async verifyEmail(email: string) {
    return this.userServiceClient.post("user/verify-email", { email });
  }
}
