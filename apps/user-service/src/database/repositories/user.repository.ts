import { EntityRepository, Repository } from "typeorm";

import * as shortid from "short-uuid";
import * as dayjs from "dayjs";

import { User } from "@user/database/entities";
import { UserStatusEnum } from "@types";

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

  async createUserGuest() {
    const newUser = this.create({
      appId: shortid.generate(),
      createdDate: dayjs().format("MM/DD/YYYY HH:mm:ss"),
      updatedDate: dayjs().format("MM/DD/YYYY HH:mm:ss"),
      userStatus: UserStatusEnum.ACTIVE,
    });

    const userRes = await this.insert(newUser);
    return { id: userRes.identifiers[0].id, ...newUser };
  }
}
