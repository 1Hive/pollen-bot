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
  const ledgerFileURI = 'https://raw.githubusercontent.com/1Hive/pollen/gh-pages/data/ledger.json'
  const ledgerFileResponse = await fetch(ledgerFileURI)

  if (!ledgerFileResponse.ok) throw new Error(`An error has occurred: ${ledgerFileResponse.status}`)

  const ledgerRaw = await ledgerFileResponse.text()
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

const fetchPollenData = async () => {
  const ledger = await loadLedger()
  const accounts = ledger.accounts()

  const credGraph = await loadCredGraph()
  const credParticipants = await Array.from(credGraph.participants())

  return { accounts, credParticipants }
}
  
module.exports = { error, log, warnOnce, loadLedger, loadCredGraph, fetchPollenData }
