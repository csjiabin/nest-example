import * as md5 from 'md5';
import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      if (!req.headers.signature)
        throw new HttpException('no signature!', HttpStatus.FORBIDDEN);
      const sign = md5(
        JSON.stringify({ timestamp: req.headers.timestamp, data: req.body }),
      );
      if (req.headers.signature !== sign)
        throw new HttpException('signature error', HttpStatus.FORBIDDEN);
      next();
    };
  }
}
