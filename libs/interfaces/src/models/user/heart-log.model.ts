import { HeartLogTypeEnum } from "@type";
import { IHeart } from "@interfaces/user";

export interface IHeartLog {
  id: string;
  heartId: string;
  currentHear: number;
  quantity: number;
  type: HeartLogTypeEnum;
  createdDate: Date;
  heart: IHeart;
}
