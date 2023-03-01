import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";

import { AuthService } from "@pub/auth/auth.service";
import { CustomError } from "@util";
import { ErrorCodeConstant, ErrorMessageConstant } from "@type";

@Injectable()
export class GuestJwtStrategy extends PassportStrategy(Strategy, "guest-jwt") {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const authHeader = String(request.headers["authorization"] || "");

    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);

      try {
        const result = await this.authService.verifyGuestToken(token);
        return result;
      } catch (error) {
        this.logger.log(error);
        if (error.status === HttpStatus.SERVICE_UNAVAILABLE) throw error;
        if (error.code === "ECONNREFUSED") throw new InternalServerErrorException("ECONNREFUSED");
        if (error.message === "guest_inactive") {
          throw new CustomError(ErrorMessageConstant.USER_INACTIVE, ErrorCodeConstant.USER_INACTIVE);
        }
        throw new UnauthorizedException("token_expired");
      }
    }

    return false;
  }
}
