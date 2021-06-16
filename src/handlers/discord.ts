import { Message } from "discord.js";

import User from "../models/user";
import { error } from "../utils";

export default async function discord(message: Message): Promise<void> {
  try {
    const foundUser = await User.findOne({ discordId: message.author.id })

    if (!foundUser) 
      throw "You first need to save your wallet address with the `!pollen save-wallet <wallet-address>` command.";

    await User.updateOne(
      { discordId: message.author.id },
      { username: message.author.tag, modifiedAt: Date.now() }
    );
    
    message.channel.send("Discord username successfully updated");
  } catch (err) {
    message.reply(err);
    error(err);
  }
}