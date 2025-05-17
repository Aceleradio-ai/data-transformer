import { PubSub } from '@google-cloud/pubsub';
import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageHandlerInterface } from 'src/application/interfaces/message-handler.interface';
import { SendCarDataUseCase } from 'src/application/usecases';
import { CarDataEntity, CarDataPayload } from 'src/domain/entities';

export class MessageHandlerImpl
  implements MessageHandlerInterface, OnModuleInit
{
  constructor(
    private readonly pubSub: PubSub,
    private readonly configService: ConfigService,
    private readonly sendCarDataUseCase: SendCarDataUseCase,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.registerMessageListener();
  }

  async registerMessageListener(): Promise<void> {
    const topicName = this.configService.get<string>('PUBSUB_TOPIC_NAME');

    if (!topicName) {
      throw new Error('PUBSUB_TOPIC_NAME is not set');
    }

    const subscriptionName = this.configService.get<string>(
      'PUBSUB_SUBSCRIPTION_NAME',
    );

    if (!subscriptionName) {
      throw new Error('PUBSUB_SUBSCRIPTION_NAME is not set');
    }

    const [topic] = await this.pubSub.createTopic(topicName);
    const [subscription] = await topic.createSubscription(subscriptionName);

    subscription.on('message', (message) => {
      try {
        const data = JSON.parse(message.data.toString()) as CarDataPayload;
        const carData = new CarDataEntity(data);

        this.sendCarDataUseCase.execute(carData);

        message.ack();
      } catch (error) {
        console.error('Error processing message:', error);
        message.ack();
      }
    });
  }
}
