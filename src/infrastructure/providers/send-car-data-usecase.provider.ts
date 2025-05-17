import { Provider } from '@nestjs/common';
import { ParseCarDataUseCase } from 'src/application/usecases';
import { SendCarDataUseCase } from 'src/application/usecases/send-car-data.usecase';
import { CarDataGateway } from '../adapters/gateways/car-data.gateway';

export const SendCarDataUseCaseProvider: Provider = {
  provide: SendCarDataUseCase,
  inject: [CarDataGateway, ParseCarDataUseCase],
  useFactory: (
    carDataGateway: CarDataGateway,
    parseCarDataUseCase: ParseCarDataUseCase,
  ) => {
    return new SendCarDataUseCase(carDataGateway, parseCarDataUseCase);
  },
};
