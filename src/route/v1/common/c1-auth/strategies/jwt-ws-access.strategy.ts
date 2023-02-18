import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import { tokenConstants } from '../token-constants';

@Injectable()
export default class JwtWSAccessStrategy extends PassportStrategy(
  Strategy,
  tokenConstants.secrets.accessToken,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (client: any) => {
          const bearerToken = client?.handshake?.headers?.authorization;
          return bearerToken ? bearerToken.split(' ')[1] : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: tokenConstants.secrets.accessToken,
    });
  }

  async validate(payload: JwtStrategyValidate): Promise<JwtStrategyValidate> {
    /* eslint no-console: 0 */
    console.log('Vao day 2', payload);
    return {
      _id: payload._id,
      role: payload.role,
    };
  }
}
