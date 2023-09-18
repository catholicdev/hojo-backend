import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

import { TransformToBoolean } from "@util";

export class FavoriteBibleSentenceDto {
  @IsNumber()
  @IsNotEmpty()
  dailyBibleSentenceId: number;

  @TransformToBoolean()
  @IsBoolean()
  @IsNotEmpty()
  isFavorite: boolean;
}
