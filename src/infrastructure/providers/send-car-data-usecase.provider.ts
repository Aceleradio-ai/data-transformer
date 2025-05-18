import { Provider } from '@nestjs/common';
import {
  ParseCarDataUseCase,
  SendCarDataUseCase,
} from 'src/application/usecases';
import { CarDataGateway } from '../adapters';

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
