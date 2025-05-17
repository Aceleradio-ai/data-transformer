import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketGatewayInterface } from 'src/application/interfaces';

@WebSocketGateway(81, { transports: ['websocket'] })
export class CarDataGateway implements SocketGatewayInterface {
  @WebSocketServer()
  server: Server;

  notify(currentCarPedalPercentage: number) {
    this.server.emit('carData', {
      currentCarPedalPercentage,
    });
  }
}
