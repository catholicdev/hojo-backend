import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";

// import { FirebaseVerifyResultInterface } from "@type";

import { AuthService } from "@pub/auth/auth.service";

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, "firebase") {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const authHeader = String(request.headers["authorization"] || "");

    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);

      try {
        // const result = await this.authService.verifyFirebaseToken(token);
        // return {
        //   userId: (result as unknown as FirebaseVerifyResultInterface).user_id,
        //   phoneNumber: (result as unknown as FirebaseVerifyResultInterface).phone_number,
        //   allEasyToken: (result as unknown as FirebaseVerifyResultInterface).allEasyToken ?? "",
        // };
      } catch (ex) {
        if (ex.code === "ECONNREFUSED") {
          throw new HttpException("ECONNREFUSED", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        throw new HttpException("token_expired", HttpStatus.UNAUTHORIZED);
      }
    }

    return false; //in case there is no token
  }
}
