import { Injectable } from "@nestjs/common";

import { AxiosInstance } from "axios";

import { userServiceConsumer } from "@util";

@Injectable()
export class AuthService {
  private userServiceClient: AxiosInstance = userServiceConsumer();

  public async verifyFirebaseToken(token: string) {
    return this.userServiceClient.post("user/auth/verify-firebase-token", { token });
  }
}
