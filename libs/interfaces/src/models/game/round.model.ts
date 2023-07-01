import { SystemStatusEnum } from "@type";

import { IStage } from "@interfaces";

export interface IRound {
  id: string;
  name: string;
  status: SystemStatusEnum;
  createdDate: Date;
  updatedDate: Date;
  updatedBy?: string;
  roundCode: string;
  imageUrl?: string;

  stages: IStage[];
}
