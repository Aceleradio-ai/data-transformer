import { CarDataEntity } from 'src/domain/entities';
import { DriverInferenceEnum } from '../enums';
import { SocketGatewayData, UseCase } from '../interfaces';
import { getIoProperty } from '../utils';

export class ParseCarDataUseCase
  implements UseCase<CarDataEntity, SocketGatewayData>
{
  execute(input: CarDataEntity): SocketGatewayData {
    const speedMap = new Map<number, DriverInferenceEnum>([
      [40, DriverInferenceEnum.Low],
      [80, DriverInferenceEnum.Moderated],
      [120, DriverInferenceEnum.High],
    ]);

    const currentSpeed = getIoProperty(input, 'Vehicle Speed');

    if (!currentSpeed) {
      return {
        currentDriverInference: DriverInferenceEnum.Low,
      };
    }

    let currentDriverInference: DriverInferenceEnum = DriverInferenceEnum.Low;

    for (const [speed, driverInference] of speedMap.entries()) {
      if (!currentSpeed.value) {
        return {
          currentDriverInference: DriverInferenceEnum.Low,
        };
      }

      if (currentSpeed.value <= speed) {
        currentDriverInference = driverInference;
        break;
      }
    }

    return {
      currentDriverInference,
    };
  }
}
