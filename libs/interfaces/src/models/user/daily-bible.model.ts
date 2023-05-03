import { IUser } from "@interfaces";

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
