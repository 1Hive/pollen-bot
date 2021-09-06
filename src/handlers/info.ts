import { Message } from "discord.js";
import { infoEmbed } from "../embed";

export default async function info(message: Message): Promise<void> {
  message.channel.send(`<@${message.author.id}>`);
  message.channel.send({ embeds: [ infoEmbed() ]});
}
