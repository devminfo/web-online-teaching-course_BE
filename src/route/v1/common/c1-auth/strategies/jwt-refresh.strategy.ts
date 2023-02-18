// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';

// import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
// import { tokenConstants } from '../token-constants';

// @Injectable()
// export default class JwtRefreshStrategy extends PassportStrategy(
//   Strategy,
//   'refreshToken',
// ) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: tokenConstants.secrets.refreshToken,
//     });
//   }

//   async validate(payload: any): Promise<JwtStrategyValidate> {
//     return {
//       _id: payload._id,
//       role: payload.role,
//     };
//   }
// }
