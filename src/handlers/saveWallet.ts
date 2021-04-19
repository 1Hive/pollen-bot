import Web3 from "web3";
import { Message } from "discord.js";
import { walletWarningEmbed } from "../embed";
import * as dotenv from "dotenv";
import { dbHandler } from "../utilities/db";
import { error } from "../utils";

dotenv.config();

const web3 = new Web3(process.env.WEB3_URL);

export default async function saveWallet(message: Message): Promise<void> {
  const rawAddress = message.content.split(" ")[2];
  if (typeof rawAddress !== undefined) {
    try {
      const xdaiAddress = web3.utils.toChecksumAddress(rawAddress);
      dbHandler(message, null, null, xdaiAddress);
      message.channel.send(`<@${message.author.id}> wallet address succesfully saved.`);
      return;
    } catch(err) {
      error(err);
      message.channel.send(walletWarningEmbed());
    }
  }
}
