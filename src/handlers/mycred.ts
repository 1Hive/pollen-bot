import { Message } from "discord.js";

import Account from "../models/Account";
import CredParticipant from "../models/CredParticipant";

import { credEmbed } from "../embed";
import { error } from "../utils";

export default async function mycred(message: Message): Promise<void> {
  try {
    const accountFound = await Account
      .findOne({ "identity.aliases": new RegExp(message.author.id) })
      .select("identity.id");

    if(!accountFound) throw "Oops, we cannot find you, try again tomorrow!";

    const credParticipant = await CredParticipant.findOne({ id: accountFound.identity.id });
    
    if(!credParticipant) throw "Alas, you have no cred yet, try again tomorrow!";
    
    const credHistory = credParticipant.credPerInterval;

    await message.channel.send(`<@${message.author.id}>`);
    await message.channel.send({ embeds: [
      credEmbed(
        credParticipant.cred,
        credHistory[credHistory.length -2],
        credHistory[credHistory.length - 1]
      )
    ]});
  } catch (err) {
    if (typeof err !== "string") error(err);
    message.reply(`An error has occurred: ${err}`);
  }
}
