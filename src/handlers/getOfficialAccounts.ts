import { Message } from "discord.js";
import { officialAccountsEmbed } from "../embed";

export default async function help(message: Message): Promise<void> {
  message.channel.send(`<@${message.author.id}>`);
  message.channel.send(officialAccountsEmbed());
}
