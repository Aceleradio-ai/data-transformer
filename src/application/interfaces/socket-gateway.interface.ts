import { DriverInferenceEnum } from '../enums';

export type SocketGatewayData = {
  currentDriverInference: DriverInferenceEnum;
};

export interface SocketGatewayInterface {
  notify(data: SocketGatewayData): void;
}
