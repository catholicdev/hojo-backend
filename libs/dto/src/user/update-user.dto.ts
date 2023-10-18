import { ApiProperty } from "@nestjs/swagger";

import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  newFirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newLastName: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  newBirthDate: string;
}
