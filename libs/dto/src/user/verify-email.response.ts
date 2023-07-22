import { ApiProperty } from "@nestjs/swagger";

export class VerifyEmailResponse {
  @ApiProperty()
  isUsed: boolean;
}
