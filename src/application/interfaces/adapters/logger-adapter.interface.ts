export interface LoggerAdapterInterface {
  log(message: string): void;
  debug(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}
