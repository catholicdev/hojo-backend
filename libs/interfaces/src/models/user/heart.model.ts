import { IUser, IHeartLog } from "@interfaces/user";

export interface IHeart {
  id: string;
  userId: string;
  currentHeart: number;
  maxHeart: number;
  createdDate: Date;
  updatedDate: Date;
  user: IUser;
  heartLogs: IHeartLog[];
}
