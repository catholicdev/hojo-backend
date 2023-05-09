import { UserStatusEnum } from "@type";

import { IDailyBible, IToken, LocationInterface } from "@interfaces";

export interface IUser {
  id: string;
  firebaseUid: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
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
