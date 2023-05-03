import { HeartLogTypeEnum } from "@type";
import { IHeart } from "@interfaces";

export interface IHeartLog {
  id: number;
  heartId: number;
  currentHear: number;
  quantity: number;
  type: HeartLogTypeEnum;
  createdDate: Date;

  heart: IHeart;
}
