export interface ISentence {
  // increment
  id: number;
  // UUID
  chapterId: string;
  pillarId?: string;
  sequence: number;
  content: string;
}
