import { ethers } from "ethers";
import { Message } from "discord.js";
import * as dotenv from "dotenv";

import User from "../models/user";
import { walletWarningEmbed } from "../embed";
import { error } from "../utils";

dotenv.config();

export default async function saveWallet(message: Message): Promise<void> {
  const rawAddress = message.content.split(" ")[2];
  if (typeof rawAddress !== "undefined") {
    try {
      const xdaiAddress = ethers.utils.getAddress(rawAddress);
      await User.findOneAndUpdate(
        { discordId: message.author.id, username: message.author.tag },
        { address: xdaiAddress },
        { upsert: true, setDefaultsOnInsert: true }
      )
      message.channel.send(`<@${message.author.id}> wallet address succesfully saved.`);
    } catch(err) {
      if (err.code === "INVALID_ARGUMENT") message.channel.send(walletWarningEmbed());
      else error(err);
    }
  }
  else message.channel.send(walletWarningEmbed());
}
