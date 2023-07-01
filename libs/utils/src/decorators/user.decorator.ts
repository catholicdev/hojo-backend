import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AuthorizedUserInterface } from "@interfaces";

export const User = createParamDecorator<AuthorizedUserInterface>(
  (_data, ctx: ExecutionContext): AuthorizedUserInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthorizedUserInterface;
  }
);
