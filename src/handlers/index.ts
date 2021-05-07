import pollen from "./pollen";
//const { verifyDiscourse, checkDiscourse } from './discourse')
//const { verifyGithub, checkGithub } from './github')
import mycred from "./mycred";
import saveWallet from "./saveWallet";
import updateroles from "./updateRoles";
import pollenBan from "./pollenBan";
import pollenUnban from "./pollenUnban";
import { getPollenBannedMsg } from "./getPollenBanned";

const handlers = new Map([
  ["pollen", pollen],
  //['verify-discourse', verifyDiscourse],
  //['check-discourse', checkDiscourse],
  //['verify-github', verifyGithub],
  //['check-github', checkGithub],
  ["save-wallet", saveWallet],
  ["mycred", mycred],
  ["updateroles", updateroles],
  ["pollenban", pollenBan],
  ["pollenunban", pollenUnban],
  ["getpollenbanned", getPollenBannedMsg]
]);

export default handlers;
