import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
