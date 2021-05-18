import { Message } from "discord.js";

import User from "../models/user";
import { error } from "../utils";

export default async function discord(message: Message): Promise<void> {
  try {
    const foundUser = await User.findOneAndUpdate(
      { discordId: message.author.id },
      { username: message.author.tag, modifiedAt: Date.now() },
      { upsert: true }
    );
    
    message.channel.send(`Discord username successfully ${foundUser ? "updated" : "saved"}.`);
  } catch (err) {
    message.reply(err);
    error(err);
  }
}