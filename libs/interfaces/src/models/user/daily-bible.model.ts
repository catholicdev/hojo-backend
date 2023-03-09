import { IUser } from "@interfaces/user";

export interface IDailyBible {
  id: number;
  userId: string;
  bookAbbreviation: string;
  chapterSequence: number;
  sequence: number;
  sentence: string;
  receiveDate: Date;
  user: IUser;
}
