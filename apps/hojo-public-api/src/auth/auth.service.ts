import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";

// import { deliveryServiceConsumer, userServiceConsumer } from "@util";
// import { ErrorCodesConstant, ErrorMessagesConstant } from "@type";
@Injectable()
export class AuthService {
  // private userService = userServiceConsumer() as AxiosInstance;
  // private deliveryService = deliveryServiceConsumer() as AxiosInstance;
  // public async verifyFirebaseToken(token: string) {
  //   const result = await this.userService.post("users/auth.verifyFirebaseToken", { token });
  //   return result.data;
  // }
  // public async verifyCustomer(token: string) {
  //   const result = await this.userService.post("users/auth.verifyCustomer", { token });
  //   return result.data;
  // }
  // public async verifyLocal(username: string, password: string) {
  //   const result = await this.userService.post("users/auth.login", { email: username, password });
  //   return result.data;
  // }
  // public async verifyDriver(userId: string) {
  //   type Response = {
  //     status: boolean;
  //     // error?: ErrorCodesConstant;
  //     // message?: ErrorMessagesConstant;
  //   };
  //   const result = await this.deliveryService.post("drivers/verify-driver", { userId });
  //   return result.data as Response;
  // }
  // public async revokeUserToken(userId: string) {
  //   const result = await this.userService.post("users/auth.revokeFirebaseToken", { userId });
  //   return result.data;
  // }
  // public async verifyPromoUserToken(token: string) {
  //   const result = await this.userService.post("promo/users/auth.validate-encoded-token", { token });
  //   return result.data;
  // }
}
