import { CarDataEntity } from 'src/domain/entities';
import { DrivingLevelEnum } from '../enums';
import {
  LoggerAdapterInterface,
  SocketGatewayData,
  UseCaseInterface,
} from '../interfaces';
import { getIoProperty } from '../utils';

export class ParseCarDataUseCase
  implements UseCaseInterface<CarDataEntity, SocketGatewayData>
{
  constructor(private readonly logger: LoggerAdapterInterface) {}

  execute(input: CarDataEntity): SocketGatewayData {
    const throttlePositionMap = new Map<number, DrivingLevelEnum>([
      [30, DrivingLevelEnum.Low],
      [60, DrivingLevelEnum.Moderated],
      [90, DrivingLevelEnum.High],
      [100, DrivingLevelEnum.VeryHigh],
    ]);

    const currentThrottlePosition = getIoProperty(input, 'Throttle Position');

    if (!currentThrottlePosition) {
      this.logger.error('No throttle position found, setting to low');

      return {
        currentDriverInference: DrivingLevelEnum.Low,
      };
    }

    let drivingLevel: DrivingLevelEnum = DrivingLevelEnum.Low;

    for (const [
      throttlePosition,
      driverInference,
    ] of throttlePositionMap.entries()) {
      if (!currentThrottlePosition.value) {
        this.logger.error('No throttle position value found');

        return {
          currentDriverInference: DrivingLevelEnum.Low,
        };
      }

      if (currentThrottlePosition.value <= throttlePosition) {
        drivingLevel = driverInference;
        break;
      }
    }

    return {
      currentDriverInference: drivingLevel,
    };
  }
}
