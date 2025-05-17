import { PubSub } from '@google-cloud/pubsub';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendCarDataUseCase } from 'src/application/usecases';
import { MessageHandlerImpl } from '../services/message-handler.impl';

export const MessageHandlerProvider: Provider = {
  provide: MessageHandlerImpl,
  inject: [ConfigService, SendCarDataUseCase],
  useFactory: (
    configService: ConfigService,
    sendCarDataUseCase: SendCarDataUseCase,
  ) => {
    const pubSub = new PubSub({
      projectId: configService.get<string>('PUBSUB_PROJECT_ID'),
    });

    return new MessageHandlerImpl(pubSub, configService, sendCarDataUseCase);
  },
};
