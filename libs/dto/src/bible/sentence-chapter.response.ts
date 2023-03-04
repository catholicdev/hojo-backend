import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class SentenceChapterResponse {
  @ApiProperty()
  @Expose()
  sequence: number;

  @ApiProperty()
  @Expose()
  content: string;
}
