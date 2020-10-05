const { RequestHandlerError } = require('../error-utils')
const handlers = require('../handlers/index')

const noop = () => undefined

module.exports = function detectHandler(message) {

  const [requestedNamespace, requestedHandler] = message.split(' ')
  // If it's not a flag, we can safely ignore this command.
  if (!requestedNamespace.includes('!')) {
    return noop()
  }
  
  const receivedHandler = handlers.get(requestedHandler)

  if (typeof receivedHandler !== 'function' && requestedNamespace === '!hny') {
    throw new RequestHandlerError(
      `Could not find command with flag ${requestedHandler}`,
    )
  }

  return receivedHandler
}
