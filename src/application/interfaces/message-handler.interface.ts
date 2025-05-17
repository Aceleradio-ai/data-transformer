export interface MessageHandlerInterface {
  onMessage(): Promise<void>;
}
