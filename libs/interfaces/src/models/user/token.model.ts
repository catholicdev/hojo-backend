import { IUser } from "@interfaces";

export interface IToken {
  id: string;
  userId: string;
  expiredAt: Date;
  user: IUser;
}
