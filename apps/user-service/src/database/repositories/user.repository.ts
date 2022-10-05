import { EntityRepository, Repository } from "typeorm";

import { User } from "@user/database/entities";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmail(email: string) {
    const user = await this.findOne({ where: { email } });

    return user;
  }
}
