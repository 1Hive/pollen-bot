import { Message } from "discord.js";
import { brightidEmbed } from "../embed";

export default async function brightid(message: Message): Promise<void> {
  message.channel.send(`<@${message.author.id}>`);
  message.channel.send(brightidEmbed());
}
