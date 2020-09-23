const getHoneyFlow = require('./getHoneyFlow')

const handlers = new Map([
  ['honeyflow', getHoneyFlow],
])

module.exports = handlers