import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { SentenceChapterResponse } from "../bible";

class GetListChapterResponse {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  sequence: number;
}

export class GetBookResponse {
  @ApiProperty({ type: () => [GetListChapterResponse] })
  @Expose()
  chapters: GetListChapterResponse[];

  @ApiProperty({ type: () => [SentenceChapterResponse] })
  @Expose()
  firstChapter: SentenceChapterResponse[];
}
