import { IStage } from "@interfaces";

export interface IStageSetting {
  id: string;
  stageId: string;
  nextStageId: string;
  rewardId?: string;
  helps: string[];
  totalQuestion?: number;
  createdDate: Date;
  updatedDate?: Date;
  updatedBy?: string;
  stage: IStage;
}
