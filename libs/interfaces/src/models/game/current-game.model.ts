import { IStage } from "@interfaces/game";

export interface ICurrentGame {
  id: string;
  userId: string;
  stageId: string;
  code: string;
  helpUsed?: string[];
  startDate: Date;
  isCompleted: boolean;
  completedDate?: Date;
  isPassed: boolean;
  passedDate?: Date;
  stage: IStage;
}
