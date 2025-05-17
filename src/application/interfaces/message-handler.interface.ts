export type OnMessageCallback = (topicName: string, message: string) => void;

export interface MessageHandlerInterface {
  onMessage(cb: OnMessageCallback): Promise<void>;
}
