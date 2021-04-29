// const getHoneyFlow from './getHoneyFlow')
import address from "./address";
import help from "./help";
import pollen from "./pollen";
import brightid from "./brightid";
import price from "./price";
import metrics from "./getMetrics";
//const { verifyDiscourse, checkDiscourse } from './discourse')
//const { verifyGithub, checkGithub } from './github')
import mycred from "./mycred";
import official from "./getOfficialAccounts";
import xDai from "./getxDai";
// import saveWallet from "./saveWallet";
import ayuda from "./ayuda";
import updateroles from "./updateRoles";
import sites from "./sites";
// import pollenBan from "./pollenBan";
// import pollenUnban from "./pollenUnban";
// import getPollenBanned from "./getPollenBanned";

const handlers = new Map([
  ["address", address],
  ["help", help],
  ["pollen", pollen],
  ["brightid", brightid],
  ["price", price],
  ["metrics", metrics],
  //['verify-discourse', verifyDiscourse],
  //['check-discourse', checkDiscourse],
  //['verify-github', verifyGithub],
  //['check-github', checkGithub],
  ["sites", sites],
  // ["save-wallet", saveWallet],
  ["mycred", mycred],
  ["official", official],
  ["network", xDai],
  ["ayuda", ayuda],
  ["updateroles", updateroles],
  // ["pollenban", pollenBan],
  // ["pollenunban", pollenUnban],
  // ["getpollenbanned", getPollenBanned],
]);

export default handlers;
