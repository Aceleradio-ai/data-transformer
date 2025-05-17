import { Provider } from '@nestjs/common';
import { ParseCarDataUseCase } from 'src/application/usecases';
import { NestJsLoggerAdapter } from '../adapters';

export const ParseCarDataUseCaseProvider: Provider = {
  provide: ParseCarDataUseCase,
  inject: [NestJsLoggerAdapter],
  useFactory: (logger: NestJsLoggerAdapter) => {
    return new ParseCarDataUseCase(logger);
  },
};
