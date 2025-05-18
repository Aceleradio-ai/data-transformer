import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  SocketGatewayData,
  SocketGatewayInterface,
} from 'src/application/interfaces';

@WebSocketGateway(1025, {
  transports: ['websocket'],
  cors: true,
  host: '0.0.0.0',
})
export class CarDataGateway
  implements SocketGatewayInterface, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor() {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  notify(data: SocketGatewayData) {
    this.server.emit('carData', data);
  }
}
