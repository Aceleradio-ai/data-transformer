import { PubSub } from '@google-cloud/pubsub';
import { ConfigService } from '@nestjs/config';
import {
  MessageHandlerInterface,
  OnMessageCallback,
} from 'src/application/interfaces/message-handler.interface';

export class MessageHandlerImpl implements MessageHandlerInterface {
  constructor(
    private readonly pubSub: PubSub,
    private readonly configService: ConfigService,
  ) {}

  async onMessage(cb: OnMessageCallback): Promise<void> {
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
      cb(topicName, message.data.toString());
      message.ack();
    });
  }
}
