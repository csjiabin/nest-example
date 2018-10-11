import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async createToken() {
    const user: JwtPayload = { id: 1 };
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }
  async createOauthToken() {
    return {};
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findUser(payload.id);
  }
}
