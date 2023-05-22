import { IChapter, IPillar } from "@interfaces";

export interface ISentence {
  // increment
  id: number;
  // UUID
  chapterId: string;
  pillarId?: string;
  sequence: number;
  content: string;

  chapter: IChapter;
  pillar?: IPillar;
}
