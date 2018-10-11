import { AuthService } from './auth.service';
import { BearerStrategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class HttpStrategy extends PassportStrategy(BearerStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: any, done: Function) {
    const user = await this.authService.validateUser(token);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    console.log(user);
    done(null, user);
  }
}
