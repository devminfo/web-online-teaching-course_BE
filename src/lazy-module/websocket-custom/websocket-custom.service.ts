import { Socket } from 'socket.io';

import AuthService from '@common/c1-auth/auth.service';
import TokenService from '@common/c1-auth/token.service';
import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export default class WebsocketCustomService {
  constructor(
    private logger: CustomLoggerService,
    private tokenService: TokenService,
  ) {
    if (
      ShareFunction.isConfigRedis()
      && ShareFunction.isConfigWebsocket()
      && ShareFunction.isEnableWebsocket()
    ) {
      this.logger.log('WebsocketCustom init success');
    } else {
      this.logger.warn(
        'REDIS_URL, ENABLE_WEBSOCKET was not found, WebsocketCustom module was not init',
      );
    }
  }

  async getUserFromSocket(socket: Socket) {
    const { authorization } = socket.handshake.headers;
    if (authorization) {
      const authToken = authorization.split('Bearer ')[1];
      if (!authToken) throw new WsException('Invalid token.');
      const user = await this.tokenService.verifyAccessToken(authToken);

      if (!user) throw new WsException('Invalid credentials.');
      return user;
    }
  }
}
