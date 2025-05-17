import { CarDataEntity } from 'src/domain/entities';
import { SocketGatewayInterface, UseCase } from '../interfaces';
import { ParseCarDataUseCase } from './parse-car-data.usecase';

export class SendCarDataUseCase implements UseCase<CarDataEntity, void> {
  constructor(
    private readonly socketGateway: SocketGatewayInterface,
    private readonly parseCarDataUseCase: ParseCarDataUseCase,
  ) {}

  execute(input: CarDataEntity): void {
    const { currentDriverInference } = this.parseCarDataUseCase.execute(input);

    this.socketGateway.notify({
      currentDriverInference,
    });
  }
}
