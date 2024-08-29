export default class HttpExceptions {
  public readonly code: number
  public readonly message: string

  constructor(message: string, code: number = 400) {
    this.code = code
    this.message = message
  }
}
