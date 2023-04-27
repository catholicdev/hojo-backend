import { QuestionLevelEnum } from "@type";
import { IAnswer, IStage } from "@interfaces/game";

export interface IQuestion {
  id: string;
  stageId: string;
  question: string;
  level: QuestionLevelEnum;
  score?: number;
  sequence: number;
  createdDate: Date;
  updatedDate: Date;
  updatedBy?: string;
  stage: IStage;
  answers?: IAnswer[];
}
