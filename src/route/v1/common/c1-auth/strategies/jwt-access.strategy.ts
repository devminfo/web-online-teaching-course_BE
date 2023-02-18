import { ExtractJwt, Strategy } from 'passport-jwt';

import UserEntity from '@common/c1-auth/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import { tokenConstants } from '../token-constants';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenConstants.secrets.accessToken,
    });
  }

  async validate(payload: UserEntity): Promise<JwtStrategyValidate> {
    return {
      _id: payload._id,
      role: payload.role,
    };
  }
}
