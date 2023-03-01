import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

import { userServiceConsumer } from "@util";
import { ErrorCodeConstant, ErrorMessageConstant } from "@type";

@Injectable()
export class AuthService {
  private userServiceClient: AxiosInstance = userServiceConsumer();

  public async verifyGuest(id: string, appId: string) {
    type Response = {
      status: boolean;
      error?: ErrorCodeConstant;
      message?: ErrorMessageConstant;
    };

    const result = await this.userServiceClient.post("user/auth/verify-guest", { id, appId });
    return result.data as Response;
  }

  public async verifyGuestToken(token: string) {
    const result = await this.userServiceClient.post("user/guest/auth.verify-token", { token });
    return result.data;
  }
}
