import { BookGroupEnum, BookTypeEnum } from "@type";
import { IChapter, IPillar } from "@interfaces/bible";

export interface IBook {
  id: string;
  type: BookTypeEnum;
  code?: string;
  name: string;
  abbreviation: string;
  totalChapter?: number;
  totalPillar?: number;
  summary: string;
  group: BookGroupEnum;
  chapters?: IChapter[];
  pillars?: IPillar[];
}
