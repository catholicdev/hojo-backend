import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BibleSentenceResponse {
  @Expose()
  @ApiProperty()
  public sentence: string;

  @Expose()
  @ApiProperty()
  public sequence: number;

  @Expose()
  @ApiProperty()
  public chapterSequence: number;

  @Expose()
  @ApiProperty()
  public bookAbbreviation: string;
}

export class WeeklyBibleRespone extends BibleSentenceResponse {
  @Expose()
  receiveDate: string;
}
