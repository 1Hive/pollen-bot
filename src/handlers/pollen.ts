import { Message } from "discord.js";
import { pollenEmbed } from "../embed";

export default async function pollen(message: Message): Promise<void> {
  message.channel.send(`<@${message.author.id}>`);
  message.channel.send(pollenEmbed());
}
