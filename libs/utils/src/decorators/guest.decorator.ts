import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { GuestInterface } from "@interfaces";

export const Guest = createParamDecorator<GuestInterface>((_data, ctx: ExecutionContext): GuestInterface => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as GuestInterface;
});
