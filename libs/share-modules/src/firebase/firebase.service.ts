import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import * as admin from "firebase-admin";
import { AxiosInstance } from "axios";
import { UpdateRequest } from "firebase-admin/lib/auth/auth-config";

import { FirebaseErrorCodeEnum } from "@type";

import { genericHttpConsumer } from "@util";

@Injectable()
export class FirebaseService {
  private readonly apiKey: string;
  private readonly httpService: AxiosInstance = genericHttpConsumer();

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get("FIREBASE_API_KEY");
  }

  async getUserByUid(uid: string) {
    return admin.auth().getUser(uid);
  }

  async getUserCustomToken(uid: string, additionalClaims = {}) {
    return admin.auth().createCustomToken(uid, additionalClaims);
  }

  async createUserByEmail(email: string, password: string) {
    return admin.auth().createUser({ email, password });
  }

  async generateEmailVerificationLink(email: string) {
    return admin.auth().generateEmailVerificationLink(email);
  }

  async getUserByEmail(email: string, nullIfNotFound?: boolean) {
    try {
      return await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code === FirebaseErrorCodeEnum.USER_NOT_FOUND) {
        if (nullIfNotFound) {
          return null;
        }
      }
      throw error;
    }
  }

  async sendVerificationEmail(idToken: string) {
    return (
      await this.httpService.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.apiKey}`, {
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
      })
    ).data;
  }

  async verifyUser(email: string, password: string) {
    return (
      await this.httpService.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
    ).data;
  }

  async refreshToken(refreshToken: string) {
    return (
      await this.httpService.post(`https://securetoken.googleapis.com/v1/token?key=${this.apiKey}`, {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      })
    ).data;
  }

  async updateUser(uid: string, { email, password }: UpdateRequest) {
    return admin.auth().updateUser(uid, { email, password });
  }

  async setUserCustomClaims(uid: string, data: object) {
    return await admin.auth().setCustomUserClaims(uid, { ...data });
  }
}
