class EnvironmentError extends Error {
  constructor(message) {
    super(`${Date.now()}: ${message}`)
    this.name = 'EnvironmentError'
  }
}

class RequestHandlerError extends Error {
  constructor(message) {
    super(`${Date.now()}: ${message}`)
    this.name = 'RequestHandlerError'
  }
}

module.exports = {
  EnvironmentError,
  RequestHandlerError
}
