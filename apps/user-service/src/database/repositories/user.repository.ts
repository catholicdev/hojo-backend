import { EntityRepository, Repository } from "typeorm";

import * as shortid from "short-uuid";
import * as dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { User } from "@user/database/entities";
import { UserStatusEnum } from "@type";

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
      id: uuidv4(),
      appId: shortid.generate(),
      createdDate: dayjs().format("MM/DD/YYYY HH:mm:ss"),
      updatedDate: dayjs().format("MM/DD/YYYY HH:mm:ss"),
      userStatus: UserStatusEnum.ACTIVE,
    });

    await this.insert(newUser);
    return { id: newUser.id, appId: newUser.appId };
  }
}
