import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { UserInterface } from "@interfaces";

export const User = createParamDecorator<UserInterface>((_data, ctx: ExecutionContext): UserInterface => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserInterface;
});
