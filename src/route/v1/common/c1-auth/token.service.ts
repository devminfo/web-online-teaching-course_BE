import { ForbiddenException, Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { tokenConstants } from './token-constants';
import { DecodedToken } from './types/decoded-token.type';
import { TokenPayload } from './types/token-payload.type';

@Global()
@Injectable()
export default class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(
    payload: TokenPayload,
    secret = tokenConstants.secret,
    expiresIn = tokenConstants.expiresIn,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  async generateAccessToken(
    payload: TokenPayload,
    atSecret = tokenConstants.secrets.accessToken,
    atExpire = tokenConstants.expirationTime.accessToken,
  ): Promise<string> {
    return this.generateToken(payload, atSecret, atExpire);
  }

  async generateRefreshToken(
    payload: TokenPayload,
    rtSecret = tokenConstants.secrets.refreshToken,
    rtExpire = tokenConstants.expirationTime.refreshToken,
  ): Promise<string> {
    return this.generateToken(payload, rtSecret, rtExpire);
  }

  async verifyToken(
    token: string,
    secret = tokenConstants.secret,
  ): Promise<DecodedToken> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, { secret });

      return decoded;
    } catch (error: any) {
      throw new ForbiddenException(error.message);
    }
  }

  async verifyAccessToken(
    token: string,
    secret = tokenConstants.secrets.accessToken,
  ): Promise<DecodedToken> {
    return this.verifyToken(token, secret);
  }

  async verifyRefreshToken(
    rfToken: string,
    rtSecret = tokenConstants.secrets.refreshToken,
  ): Promise<DecodedToken> {
    return this.verifyToken(rfToken, rtSecret);
  }
}
