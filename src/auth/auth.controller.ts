import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }
  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    // this route is restricted
    return {
      message: 'successful authentication!',
    };
  }
  @Get('oauth')
  async createOauthToken(): Promise<any> {
    return await this.authService.createOauthToken();
  }
}
