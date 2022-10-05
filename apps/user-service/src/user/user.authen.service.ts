import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

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
}
