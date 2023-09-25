import { Injectable } from "@nestjs/common";

import { UserRepository } from "@user/database/repositories";

@Injectable()
export class UserInformService {
  constructor(private userRepo: UserRepository) {}

  async getNameUser(userIds: string[]) {
    if (!userIds || userIds.length <= 0) return [];
    const listName = await this.userRepo
      .createQueryBuilder("users")
      .select(["users.firstName firstName", "users.lastName lastName", "id"])
      .where("users.id IN (:...userIds)", {
        userIds,
      })
      .getRawMany();

    return Object.fromEntries(
      new Map(
        listName.map(({ lastName, firstName, id }) => {
          return [id, { firstName, lastName }];
        })
      )
    );
  }
}
