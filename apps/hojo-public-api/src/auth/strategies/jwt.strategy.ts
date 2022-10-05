import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

// import { TokenPayloadInterface } from "@type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get("JWT_SECRET").replace(/\\n/g, "\n"),
      ignoreExpiration: false,
    });
  }

  // async validate(payload: TokenPayloadInterface) {
  //   return { userId: payload.user_id, email: payload.email, phoneNumber: payload.phone_number };
  // }
}
