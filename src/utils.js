const { sourcecred: sc } = require('sourcecred')
const fetch = require('node-fetch')

// NOTE: As this is a "server bot",
// we don't avoid logging on production, as users will be able
// to see logs from their individual instances
function error(...args) {
  console.error(`${Date.now()}:`, ...args)
}
function log(...args) {
  console.log(`${Date.now()}:`, ...args)
}
  
const Warned = new Map()
function warnOnce(domain, ...args) {
  if (!Warned.get(domain)) {
    Warned.set(domain, true)
    console.warn(`${Date.now()}:`, ...args)
  }
}

const loadLedger = async () => {
  const ledgerFile = 'https://raw.githubusercontent.com/1Hive/pollen/gh-pages/data/ledger.json'
  const ledgerRaw = await (await fetch(ledgerFile)).text()
  try {
    return sc.ledger.ledger.Ledger.parse(ledgerRaw)
  } catch (err) {
    console.log(err)
    return null
  }
}

const loadCredGraph = async () => {
  const base = 'https://raw.githubusercontent.com/1Hive/pollen/gh-pages/'
  const instance = sc.instance.readInstance.getNetworkReadInstance(base)
  try {
    return instance.readCredGraph()
  } catch (err) {
    console.log(err)
    return null
  }
}
  
module.exports = { error, log, warnOnce, loadLedger, loadCredGraph }