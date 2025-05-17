import { DrivingLevelEnum } from '../enums';

export type SocketGatewayData = {
  currentDriverLevel: DrivingLevelEnum;
};

export interface SocketGatewayInterface {
  notify(data: SocketGatewayData): void;
}
