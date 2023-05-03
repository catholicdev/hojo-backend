import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import * as dayjs from "dayjs";
import { FirebaseService } from "@share/firebase/firebase.service";
import { compare, genSalt, hash } from "bcryptjs";
import { auth } from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

import { CreateUserDto, UserPasswordLoginDto } from "@dto";

import { ErrorCodeConstant, ErrorMessageConstant, UserStatusEnum, UserTokenTypeEnum } from "@type";

import { TokenRepository, UserRepository } from "@user/database/repositories";
import { UsersHelperService } from "@user/user/user.helper.service";

@Injectable()
export class UserAuthenService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenRepo: TokenRepository,
    private readonly userHelperService: UsersHelperService,
    private readonly firebaseService: FirebaseService
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

  async verifyFirebaseToken(token: string) {
    return auth().verifyIdToken(token);
  }

  async registerNewUser(payload: CreateUserDto) {
    const salt = await genSalt(10);
    const newPassword = await hash(payload.password, salt);

    let accessToken: string;
    let uid: string;

    try {
      const result = await this.firebaseService.createUserByEmail(payload.email, newPassword);
      uid = result?.uid;
    } catch (error) {
      const result = await this.firebaseService.getUserByEmail(payload.email);
      uid = result?.uid;
    }

    try {
      accessToken = await this.firebaseService.getUserCustomToken(uid);
    } catch (error) {
      throw new NotFoundException("Could not get custom access token for user.");
    }

    if (accessToken) {
      try {
        const newUser = this.userRepo.create({
          appId: uid,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          passwordHash: newPassword,
        });

        await this.userRepo.save(newUser);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }

      return { accessToken };
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
    return { accessToken };
  }

  async verifyEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException(`Email này đã được sử dụng.`);
    }

    return true;
  }
}
