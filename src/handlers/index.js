// const getHoneyFlow = require('./getHoneyFlow')
const address = require('./address')
const help = require('./help')
const pollen = require('./pollen')
const brightid = require('./brightid')
const price = require('./price')
// const { verifyDiscourse, checkDiscourse } = require('./discourse')
// const { verifyGithub, checkGithub } = require('./github')
const mycred = require('./mycred')

const handlers = new Map([
  ['address', address],
  ['help', help],
  ['pollen', pollen],
  ['brightid', brightid],
  ['price', price],
  // ['verify-discourse', verifyDiscourse],
  // ['check-discourse', checkDiscourse],
  // ['verify-github', verifyGithub],
  // ['check-github', checkGithub],
  ['mycred', mycred],
])

module.exports = handlers
