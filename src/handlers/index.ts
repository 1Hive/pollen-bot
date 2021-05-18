import info from "./info";
import help from "./help";
import userinfo from "./userinfo";
import discord from "./discord";
import { verifyDiscourse, checkDiscourse } from "./discourse";
import { verifyGithub, checkGithub } from "./github";
import mycred from "./mycred";
import saveWallet from "./saveWallet";
import updateroles from "./updateRoles";
import pollenBan from "./pollenBan";
import pollenUnban from "./pollenUnban";
import { getPollenBannedMsg } from "./getPollenBanned";
import getLastModified from "./getLastModified";

const handlers = new Map([
  ["info", info],
  ["help", help],
  ["userinfo", userinfo],
  ["save-discord", discord],
  ["verify-discourse", verifyDiscourse],
  ["check-discourse", checkDiscourse],
  ["verify-github", verifyGithub],
  ["check-github", checkGithub],
  ["save-wallet", saveWallet],
  ["mycred", mycred],
  ["updateroles", updateroles],
  ["pollenban", pollenBan],
  ["pollenunban", pollenUnban],
  ["getpollenbanned", getPollenBannedMsg],
  ["getlastmodified", getLastModified]
]);

export default handlers;
