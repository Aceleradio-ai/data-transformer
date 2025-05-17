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
      [20, DrivingLevelEnum.Low],
      [40, DrivingLevelEnum.Moderated],
      [60, DrivingLevelEnum.High],
    ]);

    const currentThrottlePosition = getIoProperty(input, 'Throttle Position');

    if (!currentThrottlePosition) {
      this.logger.error('No throttle position found, setting to low');

      return {
        currentDriverLevel: DrivingLevelEnum.Low,
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
          currentDriverLevel: DrivingLevelEnum.Low,
        };
      }

      if (currentThrottlePosition.value <= throttlePosition) {
        drivingLevel = driverInference;
        break;
      }
    }

    return {
      currentDriverLevel: drivingLevel,
    };
  }
}
