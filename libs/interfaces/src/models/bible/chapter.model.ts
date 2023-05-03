import { IBook, ISentence } from "@interfaces";

export interface IChapter {
  id: string;
  bookId: string;
  code?: string;
  sequence: string;
  name?: string;
  summary?: string;
  book: IBook;
  sentences?: ISentence[];
}
