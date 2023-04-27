import { IUser } from "@interfaces/user";

export interface IToken {
  id: string;
  userId: string;
  expiredAt: Date;
  user: IUser;
}
