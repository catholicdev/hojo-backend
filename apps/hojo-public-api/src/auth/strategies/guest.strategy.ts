import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "@pub/auth/auth.service";

@Injectable()
export class GuestStrategy extends PassportStrategy(Strategy, "guest") {
  constructor(private authService: AuthService) {
    super({
      usernameField: "id",
      passwordField: "appId",
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const result = await this.authService.verifyGuest(username, password);

    if (!result.status) throw new UnauthorizedException();

    return true;
  }
}
