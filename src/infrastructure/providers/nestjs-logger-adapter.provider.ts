import { Provider } from '@nestjs/common';
import { NestJsLoggerAdapter } from '../adapters';

export const NestJsLoggerAdapterProvider: Provider = {
  provide: NestJsLoggerAdapter,
  useFactory: () => {
    return new NestJsLoggerAdapter();
  },
};
