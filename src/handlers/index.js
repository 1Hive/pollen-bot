// const getHoneyFlow = require('./getHoneyFlow')
const getHoneyAddy = require('./getHoneyAddy')
const help = require('./help')
const pollen = require('./pollen')

const handlers = new Map([
  ['address', getHoneyAddy],
  ['help', help],
  ['pollen', pollen],
])

module.exports = handlers
