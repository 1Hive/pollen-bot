export class EnvironmentError extends Error {
  constructor(message: string) {
    super(`${Date.now()}: ${message}`);
    this.name = "EnvironmentError";
  }
}

export class RequestHandlerError extends Error {
  constructor(message: string) {
    super(`${Date.now()}: ${message}`);
    this.name = "RequestHandlerError";
  }
}
