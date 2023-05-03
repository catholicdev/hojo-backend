import { ISentence, IBook } from "@interfaces";

export interface IPillar {
  id: string;
  bookId: string;
  title: string;
  sequence: number;
  fromSentence?: number;
  toSentence?: number;

  // Relationship
  book: IBook;
  sentences?: ISentence[];
}
