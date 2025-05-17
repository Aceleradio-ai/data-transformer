import { Provider } from '@nestjs/common';
import { ParseCarDataUseCase } from 'src/application/usecases';

export const ParseCarDataUseCaseProvider: Provider = {
  provide: ParseCarDataUseCase,
  useFactory: () => {
    return new ParseCarDataUseCase();
  },
};
