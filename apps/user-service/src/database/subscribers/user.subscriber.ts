import { EntitySubscriberInterface, EventSubscriber } from "typeorm";
import { User } from "../entities";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo(): any {
    return User;
  }
  async afterLoad(entity: User): Promise<any> {
    entity.fullName = entity.firstName + " " + entity.lastName;
  }
}
