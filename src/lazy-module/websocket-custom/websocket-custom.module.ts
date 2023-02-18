import TokenService from '@common/c1-auth/token.service';
import { Global, Module } from '@nestjs/common';

import WebsocketCustomGateway from './websocket-custom.gateway';
import WebsocketCustomService from './websocket-custom.service';

@Global()
@Module({
  imports: [],
  providers: [WebsocketCustomService, WebsocketCustomGateway, TokenService],
  exports: [WebsocketCustomService],
})
export default class WebsocketCustomModule {}
