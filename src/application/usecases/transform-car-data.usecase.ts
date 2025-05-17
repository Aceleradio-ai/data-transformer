import { CarDataEntity } from 'src/domain/entities/car-data.entity';
import { MessageHandlerInterface } from '../interfaces/message-handler.interface';
import { SocketGatewayInterface } from '../interfaces/socket-gateway.interface';
import { UseCase } from '../interfaces/use-case.interface';

export class TransformCarDataUseCase
  implements UseCase<CarDataEntity, Promise<void>>
{
  constructor(
    private readonly messageHandler: MessageHandlerInterface,
    private readonly socketGateway: SocketGatewayInterface,
  ) {}

  async execute(input: CarDataEntity): Promise<void> {
    await this.messageHandler.onMessage((topicName, message) => {
      this.socketGateway.notify(message);
    });
  }
}
