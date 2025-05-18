import { CarDataEntity } from 'src/domain/entities';
import { DrivingLevelEnum } from '../enums';
import {
  LoggerAdapterInterface,
  ParseCarDataUseCaseInterface,
  SocketGatewayData,
} from '../interfaces';
import { getIoProperty } from '../utils';

export class ParseCarDataUseCase implements ParseCarDataUseCaseInterface {
  constructor(private readonly logger: LoggerAdapterInterface) {}

  execute(input: CarDataEntity): SocketGatewayData {
    const throttlePositionMap = new Map<number, DrivingLevelEnum>([
      [8, DrivingLevelEnum.Low],
      [14, DrivingLevelEnum.Moderated],
      [21, DrivingLevelEnum.High],
      [100, DrivingLevelEnum.VeryHigh],
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
