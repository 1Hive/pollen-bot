import { Message } from "discord.js";

import { PollenData } from "../types";
import { credEmbed } from "../embed";
import { error } from "../utils";

export default async function mycred(message: Message, pollenData: PollenData): Promise<void> {
  try {
    if (!pollenData) throw "Still preloading pollen files, try again in a minute.";

    const { accounts, credParticipants } = pollenData;

    const accountFound = accounts
      .find(account => account.identity.aliases.some(alias => alias.address.includes(message.author.id)));
    
    if(!accountFound) throw "Alas, we cannot find you, try again tomorrow!";

    const credParticipant = credParticipants.find(p => p.id === accountFound.identity.id);
    const credHistory = credParticipant.credPerInterval;

    await message.channel.send(`<@${message.author.id}>`);
    await message.channel.send(credEmbed(
      credParticipant.cred,
      credHistory[credHistory.length -2],
      credHistory[credHistory.length - 1]
    ));
  } catch (err) {
    if (typeof err !== "string") error(err);
    message.reply(`An error has occurred: ${err}`);
  }
}
