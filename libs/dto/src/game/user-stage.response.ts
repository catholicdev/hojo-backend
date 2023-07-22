import { ApiProperty } from "@nestjs/swagger";

import { GameHelpEnum } from "@type";

import { GetStageResponse } from "./get-stages.response";

class StageSetting {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty({ format: "uuid" })
  stageId: string;

  @ApiProperty({ format: "uuid" })
  rewardId: string;

  @ApiProperty({ enum: GameHelpEnum, isArray: true })
  helps: GameHelpEnum[];

  @ApiProperty()
  totalQuestion: number;

  @ApiProperty()
  createdDate: string;

  @ApiProperty()
  updatedDate: string;

  @ApiProperty()
  updatedBy: string;
}

class CurrentGame_UserStageResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  stageId: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ enum: GameHelpEnum, isArray: true })
  helpUsed: GameHelpEnum[];

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty()
  isPassed: boolean;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  completedDate: string;

  @ApiProperty()
  passedDate: string;
}

export class UserStageResponse extends GetStageResponse {
  @ApiProperty()
  stageSetting: StageSetting;

  @ApiProperty({ type: CurrentGame_UserStageResponse, isArray: true })
  currentGames: CurrentGame_UserStageResponse[];
}
