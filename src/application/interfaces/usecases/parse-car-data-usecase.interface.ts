import { CarDataEntity } from 'src/domain/entities';
import { SocketGatewayData } from '../socket-gateway.interface';

export interface ParseCarDataUseCaseInterface {
  execute(input: CarDataEntity): SocketGatewayData;
}
