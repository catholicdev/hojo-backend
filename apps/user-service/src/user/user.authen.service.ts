import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { ErrorCodeConstant, ErrorMessageConstant, UserStatusEnum } from "@type";

import { TokenRepository, UserRepository } from "@user/database/repositories";
import { UsersHelperService } from "@user/user/user.helper.service";

@Injectable()
export class UserAuthenService {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: TokenRepository,
    private userHelperService: UsersHelperService
  ) {}

  async authenticateUserEmail(email: string) {
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new HttpException(`User ${email} not found`, HttpStatus.NOT_FOUND);
    }

    return { message: "Welcome to user-service!" };
  }

  async loginGuest() {
    const newGuest = await this.userRepo.createUserGuest();

    const newToken = this.tokenRepo.create({
      id: uuidv4(),
      userId: newGuest.id,
      expiredAt: dayjs().add(Number(process.env.GUEST_EXPIRATION_TIME), "s").format("MM/DD/YYYY HH:mm:ss"),
    });

    await this.tokenRepo.insert(newToken);

    const payload = { userId: newGuest.id, appId: newGuest.appId, tokenId: newToken.id };
    const token = this.userHelperService.encodeToken(payload);

    return { token, appId: newGuest.appId, userId: newGuest.id };
  }

  async reloginGuest(userId: string, appId: string) {
    const verifiedGuest = await this.verifyGuest(userId, appId);

    if (!verifiedGuest.status) return verifiedGuest;

    const newToken = this.tokenRepo.create({
      userId: userId,
      expiredAt: dayjs().add(Number(process.env.GUEST_EXPIRATION_TIME), "s").format("MM/DD/YYYY HH:mm:ss"),
    });

    const tokenId = (await this.tokenRepo.insert(newToken)).identifiers[0].id;

    const payload = { userId, appId, tokenId: tokenId };
    const token = this.userHelperService.encodeToken(payload);

    return { token };
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
