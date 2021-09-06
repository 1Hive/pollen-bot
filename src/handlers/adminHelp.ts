import { Message } from "discord.js";
import { adminHelpEmbed } from "../embed";

export default async function adminHelp(message: Message): Promise<void> {
  if (process.env.POLLEN_ADMIN.includes(message.author.id)) {
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embeds: [ adminHelpEmbed() ] });
  } else message.reply("You do not have access to this command.")
}