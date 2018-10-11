import { ReflectMetadata, createParamDecorator } from '@nestjs/common';

export const Auth = (...args: string[]) => {
  return ReflectMetadata('auth', args);
};
export const AuthDecorator = createParamDecorator((data, req) => {
  return {
    auth: !!req.headers.signature,
    req,
  };
});
