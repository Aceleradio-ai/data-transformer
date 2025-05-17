import { Provider } from '@nestjs/common';
import { CarDataGateway } from '../adapters';

export const CarDataGatewayProvider: Provider = {
  provide: CarDataGateway,
  useFactory: () => {
    return new CarDataGateway();
  },
};
