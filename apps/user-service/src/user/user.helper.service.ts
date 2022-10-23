import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as jwt from "jwt-simple";

@Injectable()
export class UsersHelperService {
  encodeToken(data: any) {
    const payload = { ...data };

    let token: string;
    try {
      token = jwt.encode(payload, process.env.SECRET);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return token;
  }

  decodeToken(token: string) {
    const decodedToken = jwt.decode(token, process.env.SECRET);
    return decodedToken;
  }
}
