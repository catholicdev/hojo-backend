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
    const salt = await genSalt(10);
    const newPassword = await hash(payload.password, salt);

    let firebaseIdToken: string;
    let uid: string;

    try {
      const result = await this.firebaseService.createUserByEmail(payload.email, newPassword);
      uid = result?.uid;
    } catch (error) {
      const result = await this.firebaseService.getUserByEmail(payload.email);
      uid = result?.uid;
    }

    try {
      const accessToken = await this.firebaseService.getUserCustomToken(uid);
      const firebaseToken = await this.firebaseService.verifyCustomToken(accessToken);
      firebaseIdToken = firebaseToken.idToken;
    } catch (error) {
      throw new NotFoundException("Could not get custom access token for user.");
    }

    if (firebaseIdToken) {
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

      return { accessToken: firebaseIdToken };
    }

    return null;
  }

  async authenticateUserPassword(payload: UserPasswordLoginDto, userTokenType: UserTokenTypeEnum) {
    const user = await this.userRepo.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    const valid = await compare(payload.password, user.passwordHash);
    if (!valid) {
      throw new BadRequestException(`Wrong password`);
    }

    const result = await this.firebaseService.verifyUser(payload.email, user.passwordHash);
    const accessToken = await this.firebaseService.getUserCustomToken(result.localId, { [userTokenType]: true });

    const firebaseToken = await this.firebaseService.verifyCustomToken(accessToken);
    return { accessToken: firebaseToken.idToken };
  }

  async verifyEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      return { isUsed: true };
    }

    return { isUsed: false };
  }
}
