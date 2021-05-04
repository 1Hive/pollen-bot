import { honeyAddy } from "../embed";
import { Message } from "discord.js";

export default async function address(message: Message): Promise<void> {
  message.channel.send(`<@${message.author.id}>`);
  message.channel.send(honeyAddy());
}
