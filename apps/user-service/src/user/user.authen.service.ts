import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCodeConstant, ErrorMessageConstant, UserStatusEnum } from "@type";

import { UserRepository } from "@user/database/repositories";

@Injectable()
export class UserAuthenService {
  constructor(private userRepo: UserRepository) {}

  async authenticateUserPassword(email: string, password: string) {
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new HttpException(`User ${email} not found`, HttpStatus.NOT_FOUND);
    }

    return { message: "Welcome to user-service!" };
  }

  async loginGuest() {
    return this.userRepo.createUserGuest();
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
}
