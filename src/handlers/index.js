// const getHoneyFlow = require('./getHoneyFlow')
const getHoneyAddy = require('./getHoneyAddy')

const handlers = new Map([['address', getHoneyAddy]])

module.exports = handlers
