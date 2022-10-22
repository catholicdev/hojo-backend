import { ApiProperty } from "@nestjs/swagger";

export class BibleSentenceResponse {
  @ApiProperty()
  sentence: string;

  @ApiProperty()
  sequence: number;

  @ApiProperty()
  chapterSequence: number;

  @ApiProperty()
  bookAbbreviation: string;
}
