import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as md5 from 'md5';
@Injectable()
export class SignverifyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log(req.url)
    const sign = md5(
      JSON.stringify({ timestamp: req.headers.timestamp, data: req.body }),
    );
    if (req.headers.signature !== sign)
      throw new HttpException('signature error', HttpStatus.FORBIDDEN);
    return true;
  }
}
