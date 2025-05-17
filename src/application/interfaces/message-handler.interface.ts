export interface MessageHandlerInterface {
  registerMessageListener(): Promise<void>;
}
