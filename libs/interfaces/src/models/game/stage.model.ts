import { IQuestion, IRound, ICurrentGame, IStageSetting } from "@interfaces/game";

export interface IStage {
  id: string;
  roundId: string;
  bookId: string;
  rewardId?: string;
  name: string;
  detail: string;
  totalQuestion: number;
  stageSequence: number;
  createdDate: Date;
  updatedDate: Date;
  updatedBy?: string;
  round: IRound;
  questions?: IQuestion[];
  currentGames?: ICurrentGame[];
  stageSetting: IStageSetting;
}
