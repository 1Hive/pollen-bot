// const getHoneyFlow = require('./getHoneyFlow')
const getHoneyAddy = require('./getHoneyAddy')
const help = require('./help')
const pollen = require('./pollen')
const brightid = require('./brightid')

const handlers = new Map([
  ['address', getHoneyAddy],
  ['help', help],
  ['pollen', pollen],
  ['brightid', brightid],
])

module.exports = handlers
