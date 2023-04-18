import { Server, Socket } from 'socket.io';

import WsExceptionsFilter from '@filter/ws-exceptions.filter';
import JwtWSAccessGuard from '@guard/jwt-ws-access.guard';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import WebsocketCustomService from './websocket-custom.service';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway(6036, { cors: true })
export default class WebsocketCustomGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  indexAtRoom: any = '';

  peers: any = {};

  @WebSocketServer()
  server: Server | undefined;

  constructor(
    private logger: CustomLoggerService,
    private readonly websocketCustomService: WebsocketCustomService,
  ) {}

  /**
   * after init
   * @param server
   */
  afterInit(server: any) {
    this.logger.log('Socket initialized');
  }

  /**
   * handle disconnect
   * @param client
   */
  handleDisconnect(client: any) {
    console.log(client.id, 'disconnected');
    if (this.server) {
      this.server.sockets
        .in(this.indexAtRoom)
        .emit('remove-peer', this.peers[client.id]);
    }
  }

  /**
   * hanlde connection
   * @param socket
   */
  async handleConnection(socket: Socket) {
    console.log(`Client ${socket.id} connected`);
    // try {
    //   const user = await this.websocketCustomService.getUserFromSocket(socket);
    //   // if (!user) socket.disconnect(true);
    // } catch (e) {
    //   socket.disconnect(true);
    // }
  }

  @SubscribeMessage('event')
  handleEvent(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('event', data);
  }

  @SubscribeMessage('typing')
  onTyping(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('typing', data);
    this.server?.sockets.emit('typing', data);
  }

  @SubscribeMessage('message')
  onSendMessage(@MessageBody() data: any) {
    /* eslint no-console: 0 */
    console.log('message', data);
    this.server?.sockets.emit('message', data);
  }
}
