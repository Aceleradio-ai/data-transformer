import { CarDataEntity } from 'src/domain/entities';
import { DriverInferenceEnum } from '../enums';
import {
  LoggerAdapterInterface,
  SocketGatewayData,
  UseCase,
} from '../interfaces';
import { getIoProperty } from '../utils';

export class ParseCarDataUseCase
  implements UseCase<CarDataEntity, SocketGatewayData>
{
  constructor(private readonly logger: LoggerAdapterInterface) {}

  execute(input: CarDataEntity): SocketGatewayData {
    const speedMap = new Map<number, DriverInferenceEnum>([
      [40, DriverInferenceEnum.Low],
      [80, DriverInferenceEnum.Moderated],
      [120, DriverInferenceEnum.High],
    ]);

    const currentSpeed = getIoProperty(input, 'Vehicle Speed');

    if (!currentSpeed) {
      this.logger.error('No current speed found');

      return {
        currentDriverInference: DriverInferenceEnum.Low,
      };
    }

    let currentDriverInference: DriverInferenceEnum = DriverInferenceEnum.Low;

    for (const [speed, driverInference] of speedMap.entries()) {
      if (!currentSpeed.value) {
        this.logger.error('No current speed value found');

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
