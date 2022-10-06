import { IsNotEmpty } from "class-validator";

export class UserPasswordLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
