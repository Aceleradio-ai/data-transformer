import { Logger } from '@nestjs/common';
import { LoggerAdapterInterface } from 'src/application/interfaces';

export class NestJsLoggerAdapter implements LoggerAdapterInterface {
  private readonly logger: Logger = new Logger(NestJsLoggerAdapter.name);

  log(message: string): void {
    this.logger.log(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
