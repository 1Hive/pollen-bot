// const getHoneyFlow = require('./getHoneyFlow')
const getHoneyAddy = require('./getHoneyAddy')
const help = require('./help')

const handlers = new Map([
  ['address', getHoneyAddy],
  ['help', help],
])

module.exports = handlers
