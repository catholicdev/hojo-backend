import { Injectable, HttpStatus, Logger, UnauthorizedException, InternalServerErrorException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import jwt_decode from "jwt-decode";

// import { CustomError } from "@util";
// import { CustomerInterface, ErrorCodesConstant, ErrorMessagesConstant } from "@type";

import { AuthService } from "@pub/auth/auth.service";

@Injectable()
export class CustomerStrategy extends PassportStrategy(Strategy, "customer") {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const authHeader = String(request.headers["authorization"] || "");

    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      const decoded = jwt_decode(token) as { allEasyToken: string };
      try {
        // const result: CustomerInterface = await this.authService.verifyCustomer(token);
        // result.allEasyToken = decoded.allEasyToken;
        // return result;
      } catch (ex) {
        this.logger.error(ex);
        if (ex.status === HttpStatus.SERVICE_UNAVAILABLE) throw ex;
        if (ex.code === "ECONNREFUSED") throw new InternalServerErrorException("ECONNREFUSED");
        if (ex.message === "customer_inactive") {
          // throw new CustomError(ErrorMessagesConstant.CUSTOMER_INACTIVE, ErrorCodesConstant.CUSTOMER_INACTIVE);
        }
        throw new UnauthorizedException("token_expired");
      }
    }

    return false; //in case there is no token
  }
}
