import { Server, Socket } from 'socket.io';

import WsExceptionsFilter from '@filter/ws-exceptions.filter';
import JwtWSAccessGuard from '@guard/jwt-ws-access.guard';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage, WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';

import WebsocketCustomService from './websocket-custom.service';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway(6036, { cors: true })
export default class WebsocketCustomGateway
implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
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

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('event')
  handleEvent(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('event', data);
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('notification_socket')
  handleNotificationSocket(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('notification_socket', data);
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('call_socket')
  handleCallSocket(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('call_socket', data);
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('end_call_socket')
  handleEndCallSocket(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('end_call_socket', data);
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('proposal_socket')
  handleProposalSocket(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('proposal_socket', data);
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('quote_socket')
  handleQuoteSocket(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('quote_socket', data);
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('peer-open')
  handlePeerOpen(@MessageBody() request: any) {
    console.log(request.media, request.socket);
    this.peers[request.socket] = request.media;
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('room-video')
  handleRoomVideo(@MessageBody() video: any) {
    if (this.server) {
      this.server.sockets.in(this.indexAtRoom).emit('re-render', video);
    }
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('from-client')
  handleFromClient(@MessageBody() request: { data: any; roomId: string }) {
    if (this.server) {
      this.indexAtRoom = request.roomId;
    }
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('to-client')
  handleToClient(
    @ConnectedSocket() socket: Socket,
    @MessageBody() clientMessage: any,
  ) {
    if (this.server) {
      this.indexAtRoom = clientMessage.room;
      socket.join(clientMessage.room);
      this.server.sockets
        .in(clientMessage.room)
        .emit('user-connected', clientMessage.id);
    }
  }

  // @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('dpfood_socket')
  handleDPFoodSocket(@MessageBody() data: string) {
    /* eslint no-console: 0 */
    console.log('SubscribeMessage event', data);
    this.server?.sockets.emit('dpfood_socket', data);
  }
}
