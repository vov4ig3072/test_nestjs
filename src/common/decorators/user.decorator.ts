import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    if (!user) {
      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  },
);
