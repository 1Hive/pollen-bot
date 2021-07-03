import { sourcecred } from "sourcecred"
import fetch from "node-fetch"

// NOTE: As this is a "server bot",
// we don't avoid logging on production, as users will be able
// to see logs from their individual instances
export function error(...args: string[]): void {
  console.error(`${Date.now()}:`, ...args);
}
export function log(...args: string[]): void {
  console.log(`${Date.now()}:`, ...args);
}

const Warned = new Map();
function warnOnce(domain, ...args) {
  if (!Warned.get(domain)) {
    Warned.set(domain, true);
    console.warn(`${Date.now()}:`, ...args);
  }
}

export async function loadLedger(): Promise<any> {
  try {
    const ledgerFileURI = "https://raw.githubusercontent.com/1Hive/pollen/gh-pages/data/ledger.json"
    const ledgerFileResponse = await fetch(ledgerFileURI);

    if (!ledgerFileResponse.ok)
      throw new Error(`An error has occurred: ${ledgerFileResponse.status}`)

    const ledgerRaw = await ledgerFileResponse.text()
    return sourcecred.ledger.ledger.Ledger.parse(ledgerRaw)
  } catch (err) {
    console.log(err)
    return null
  }
}
