import { ethers } from "ethers";
import { Message } from "discord.js";
import { walletWarningEmbed } from "../embed";
import * as dotenv from "dotenv";
import { dbHandler } from "../utilities/db";
import { error } from "../utils";

dotenv.config();

export default async function saveWallet(message: Message): Promise<void> {
  const rawAddress = message.content.split(" ")[2];
  if (typeof rawAddress !== "undefined") {
    try {
      const xdaiAddress = ethers.utils.getAddress(rawAddress);
      dbHandler(message, null, null, xdaiAddress);
      message.channel.send(`<@${message.author.id}> wallet address succesfully saved.`);
    } catch(err) {
      error(err);
      message.channel.send(walletWarningEmbed());
    }
  }
}
