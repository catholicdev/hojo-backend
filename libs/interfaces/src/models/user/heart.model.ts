import { IUser, IHeartLog } from "@interfaces";

export interface IHeart {
  id: number;
  userId: string;
  currentHeart: number;
  maxHeart: number;
  createdDate: Date;
  updatedDate: Date;
  user: IUser;
  heartLogs: IHeartLog[];
}
