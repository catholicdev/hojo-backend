import { EntityRepository, Repository } from "typeorm";

import { User } from "@user/database/entities";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(userId: string) {
    const user = await this.findOne({ where: { id: userId } });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}
