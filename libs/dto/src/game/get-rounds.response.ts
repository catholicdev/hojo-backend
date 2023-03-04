import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GetRoundsResponse {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  code: string;
}
