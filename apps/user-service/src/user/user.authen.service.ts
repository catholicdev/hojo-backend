import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCodeConstant, ErrorMessageConstant, UserStatusEnum } from "@type";

import { TokenRepository, UserRepository } from "@user/database/repositories";
import { UsersHelperService } from "@user/user/user.helper.service";
import dayjs = require("dayjs");

@Injectable()
export class UserAuthenService {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: TokenRepository,
    private userHelperService: UsersHelperService
  ) {}

  async authenticateUserPassword(email: string, password: string) {
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new HttpException(`User ${email} not found`, HttpStatus.NOT_FOUND);
    }

    return { message: "Welcome to user-service!" };
  }

  async loginGuest() {
    const newGuest = await this.userRepo.createUserGuest();

    const newToken = this.tokenRepo.create({
      userId: newGuest.id,
      expiredAt: dayjs().add(24, "hours").format("MM/DD/YYYY HH:mm:ss"),
    });

    const tokenId = (await this.tokenRepo.insert(newToken)).identifiers[0].id;

    const payload = { userId: newGuest.id, appId: newGuest.appId, tokenId: tokenId };
    const token = this.userHelperService.encodeToken(payload);

    return { token, appId: newGuest.appId, userId: newGuest.id };
  }

  async verifyGuest(id: string, appId: string) {
    type Response = {
      status: boolean;
      error?: ErrorCodeConstant;
      message?: ErrorMessageConstant;
    };

    const response: Response = {
      status: true,
      error: undefined,
      message: undefined,
    };

    const user = await this.userRepo.findOne({ where: { id, appId } });

    if (!user) {
      response.status = false;
      response.error = ErrorCodeConstant.USER_NOT_REGISTERED;
      response.message = ErrorMessageConstant.USER_NOT_REGISTERED;
      return response;
    }

    if (user.userStatus === UserStatusEnum.INACTIVE) {
      response.status = false;
      response.error = ErrorCodeConstant.USER_INACTIVE;
      response.message = ErrorMessageConstant.USER_INACTIVE;
      return response;
    }

    return response;
  }

  async verifyGuestToken(token: string) {
    try {
      const decodedToken = await this.userHelperService.decodeToken(token);
      const { tokenId } = decodedToken;

      const tokenRes = await this.tokenRepo.findOne({ where: { id: tokenId } });

      if (!tokenRes) {
        throw new HttpException("invalid_token", HttpStatus.UNAUTHORIZED);
      }

      if (dayjs(tokenRes.expiredAt).isBefore(dayjs())) {
        throw new HttpException("token_expired.", HttpStatus.UNAUTHORIZED);
      }

      return decodedToken;
    } catch (error) {
      throw new HttpException(`invalid_token`, HttpStatus.FORBIDDEN);
    }
  }
}
