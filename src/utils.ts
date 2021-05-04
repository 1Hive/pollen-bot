import { sourcecred } from "sourcecred";
import fetch from "node-fetch";

import { PollenData } from "./types";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadLedger = async (): Promise<any> => {
  const ledgerFileURI =
    "https://raw.githubusercontent.com/1Hive/pollen/gh-pages/data/ledger.json";
  const ledgerFileResponse = await fetch(ledgerFileURI);

  if (!ledgerFileResponse.ok)
    throw new Error(`An error has occurred: ${ledgerFileResponse.status}`);

  const ledgerRaw = await ledgerFileResponse.text();
  try {
    return sourcecred.ledger.ledger.Ledger.parse(ledgerRaw);
  } catch (err) {
    console.log(err);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadCredGraph = async (): Promise<any> => {
  const base = "https://raw.githubusercontent.com/1Hive/pollen/gh-pages/";
  const instance = sourcecred.instance.readInstance.getNetworkReadInstance(
    base
  );
  try {
    return instance.readCredGraph();
  } catch (err) {
    console.log(err);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchPollenData(): Promise<PollenData> {
  const ledger = await loadLedger();
  const accounts = ledger.accounts();

  const credGraph = await loadCredGraph();
  const credParticipants = Array.from(credGraph.participants());

  return { accounts, credParticipants };
}
