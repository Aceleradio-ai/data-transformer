import { CarDataEntity } from 'src/domain/entities';
import {
  SendCarDataUseCaseInterface,
  SocketGatewayInterface,
} from '../interfaces';
import { ParseCarDataUseCase } from './parse-car-data.usecase';

export class SendCarDataUseCase implements SendCarDataUseCaseInterface {
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
