import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { FirebaseService } from "@share/firebase/firebase.service";
import { compare, genSalt, hash } from "bcryptjs";
import { auth } from "firebase-admin";

import { CreateUserDto, UserPasswordLoginDto } from "@dto";

import { ErrorCodeConstant, ErrorMessageConstant, UserStatusEnum, UserTokenTypeEnum } from "@type";

import { IUser } from "@interfaces";

import { UserRepository } from "@user/database/repositories";

@Injectable()
export class UserAuthenService {
  constructor(private readonly userRepo: UserRepository, private readonly firebaseService: FirebaseService) {}

  async authenticateUserEmail(email: string) {
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new HttpException(`User ${email} not found`, HttpStatus.NOT_FOUND);
    }

    return { message: "Welcome to user-service!" };
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

  async verifyFirebaseToken(token: string) {
    const result = await auth().verifyIdToken(token);
    return result;
  }

  async registerNewUser(payload: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({ email: payload.email });
    if (existingUser) throw new BadRequestException("Email đã được sử dụng rồi.");

    const salt = await genSalt(10);
    const newPassword = await hash(payload.password, salt);

    let uid: string;

    try {
      const result = await this.firebaseService.createUserByEmail(payload.email, newPassword);
      uid = result?.uid;
    } catch (error) {
      const result = await this.firebaseService.getUserByEmail(payload.email);
      uid = result?.uid;
    }

    try {
      const accessToken = await this.firebaseService.getUserCustomToken(uid, { [UserTokenTypeEnum.GAMER]: true });
      const firebaseToken = await this.firebaseService.verifyCustomToken(accessToken);

      if (firebaseToken) {
        try {
          const newUser = this.userRepo.create({
            id: uid,
            firebaseUid: uid,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            passwordHash: newPassword,
          });

          await this.userRepo.save(newUser);
        } catch (error) {
          throw new InternalServerErrorException(error);
        }

        return firebaseToken;
      }
    } catch (error) {
      throw new NotFoundException("Could not get custom access token for user.");
    }
  }

  async authenticateUserPassword(payload: UserPasswordLoginDto, userTokenType: UserTokenTypeEnum) {
    const user: IUser = await this.userRepo.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new NotFoundException(`Không tồn tại tài khoản này.`);
    }

    const valid = await compare(payload.password, user.passwordHash);
    if (!valid) {
      throw new BadRequestException(`Mật khẩu không chính xác.`);
    }

    try {
      const result: any = await this.firebaseService.verifyUser(payload.email, user.passwordHash);
      const accessToken = await this.firebaseService.getUserCustomToken(result.localId, { [userTokenType]: true });

      return this.firebaseService.verifyCustomToken(accessToken);
    } catch (ex) {
      switch (ex.response.error.message) {
        case "EMAIL_NOT_FOUND":
          throw new BadRequestException("Sorry, you are not registered");

        case "INVALID_PASSWORD":
          throw new BadRequestException("The password you entered is incorrect. Please try again!");
      }

      if (ex.response.error.message.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER")) {
        throw new BadRequestException(
          "Access to this account has been temporarily disabled due to many failed login attempts!"
        );
      }

      throw new InternalServerErrorException(ex.response.error.message);
    }
  }

  async verifyEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      return { isUsed: true };
    }

    return { isUsed: false };
  }
}
