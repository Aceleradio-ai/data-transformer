export interface UseCaseInterface<I, O> {
  execute(input: I): O | Promise<O>;
}
