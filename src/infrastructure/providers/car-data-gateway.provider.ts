import { Provider } from '@nestjs/common';
import { CarDataGateway } from '../adapters/gateways/car-data.gateway';

export const CarDataGatewayProvider: Provider = {
  provide: CarDataGateway,
  useFactory: () => {
    return new CarDataGateway();
  },
};
