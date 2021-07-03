import { Message } from "discord.js";
import { adminHelpEmbed } from "../embed";

export default async function adminHelp(message: Message): Promise<void> {
  if (message.author.id === process.env.POLLEN_ADMIN) {
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send(adminHelpEmbed());
  } else message.reply("You do not have access to this command.")
}