import { CarDataEntity } from 'src/domain/entities';
import { SocketGatewayInterface, UseCaseInterface } from '../interfaces';
import { ParseCarDataUseCase } from './parse-car-data.usecase';

export class SendCarDataUseCase
  implements UseCaseInterface<CarDataEntity, void>
{
  constructor(
    private readonly socketGateway: SocketGatewayInterface,
    private readonly parseCarDataUseCase: ParseCarDataUseCase,
  ) {}

  execute(input: CarDataEntity): void {
    const { currentDriverLevel: currentDriverInference } =
      this.parseCarDataUseCase.execute(input);

    this.socketGateway.notify({
      currentDriverLevel: currentDriverInference,
    });
  }
}
