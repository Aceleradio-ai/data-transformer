import { CarDataEntity } from 'src/domain/entities';

export interface SendCarDataUseCaseInterface {
  execute(input: CarDataEntity): void;
}
