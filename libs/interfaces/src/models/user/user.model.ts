import { UserStatusEnum, LocationInterface } from "@type";
import { IDailyBible, IToken } from "@interfaces/user";

export interface IUser {
  id: string;
  appId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdDate: Date;
  updatedDate: Date;
  userStatus: UserStatusEnum;
  deviceToken?: string;
  referredBy?: string;
  city?: string;
  province?: string;
  location: LocationInterface;
  dailyBibles?: IDailyBible[];
  tokens?: IToken[];
}
