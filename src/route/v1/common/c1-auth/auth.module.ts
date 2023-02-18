import UserModule from '@authorization/a1-user/user.module';
import JwtWSAccessStrategy from '@common/c1-auth/strategies/jwt-ws-access.strategy';
import OtpModule from '@common/c2-otp/otp.module';
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import TokenService from './token.service';

@Global()
@Module({
  imports: [UserModule, PassportModule, OtpModule],
  providers: [
    AuthService,
    JwtAccessStrategy,
    // JwtRefreshStrategy,
    JwtWSAccessStrategy,
    TokenService,
  ],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export default class AuthModule {}
