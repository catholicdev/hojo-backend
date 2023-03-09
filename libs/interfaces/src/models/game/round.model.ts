import { SystemStatusEnum } from "@type";
import { IStage } from "@interfaces/game";

export interface IRound {
  id: string;
  name: string;
  status: SystemStatusEnum;
  createdDate: Date;
  updatedDate: Date;
  updatedBy?: string;
  roundCode: string;
  stages: IStage[];
}
