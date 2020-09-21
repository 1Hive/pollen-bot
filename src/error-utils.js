class EnvironmentError extends Error {
  constructor(message) {
    super(`${Date.now()}: ${message}`)
    this.name = 'EnvironmentError'
  }
}

module.exports = {
  EnvironmentError
}
