import { Provider } from '@nestjs/common';
import { TransformCarDataUseCase } from 'src/application/usecases/transform-car-data.usecase';

export const TransformCarDataUseCaseProvider: Provider = {
  provide: TransformCarDataUseCase,
  useFactory: () => {
    return new TransformCarDataUseCase();
  },
};
