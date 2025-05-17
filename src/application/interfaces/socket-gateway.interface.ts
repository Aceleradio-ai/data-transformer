import { DrivingLevelEnum } from '../enums';

export type SocketGatewayData = {
  currentDriverInference: DrivingLevelEnum;
};

export interface SocketGatewayInterface {
  notify(data: SocketGatewayData): void;
}
