// const getHoneyFlow = require('./getHoneyFlow')
const address = require('./address')
const help = require('./help')
const pollen = require('./pollen')
const brightid = require('./brightid')
const getcred = require('./getcred')

const handlers = new Map([
  ['address', address],
  ['help', help],
  ['pollen', pollen],
  ['brightid', brightid],
  ['getcred', getcred]
])

module.exports = handlers
