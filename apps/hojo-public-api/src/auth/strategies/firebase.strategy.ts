import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-custom";

import { IFirebaseVerifyResult } from "@interfaces";

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
        const result: any = await this.authService.verifyFirebaseToken(token);
        return {
          userId: (result as unknown as IFirebaseVerifyResult).user_id,
          phoneNumber: (result as unknown as IFirebaseVerifyResult).phone_number,
          hojoToken: (result as unknown as IFirebaseVerifyResult).hojoToken ?? "",
        };
      } catch (ex) {
        if (ex.code === "ECONNREFUSED") {
          throw new InternalServerErrorException("ECONNREFUSED");
        }
        throw new UnauthorizedException("token_expired");
      }
    }

    return false; //in case there is no token
  }
}
