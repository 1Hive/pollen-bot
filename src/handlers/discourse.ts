import {
  handleDiscourseVerify,
  handleDiscourseCheck,
} from "../lib/discourse-verification";
import {
  parseDiscourseVerification,
  parseDiscourseCheck,
} from "../parser/discourse";
import User from "../models/user";

import { Message } from "discord.js";
import { log } from "../utils";

export async function verifyDiscourse(message: Message): Promise<void> {
  try {
    const foundUser = await User.findOne({ discordId: message.author.id })

    if (!foundUser) 
      throw "You first need to save your wallet address with the `!pollen save-wallet <wallet-address>` command.";

    const [username] = parseDiscourseVerification(
      message.content,
      message.author.id
    );
    if (username) {
      const response = await handleDiscourseVerify(message.author.id, username);
      message.author.send(response.message);
    }
  } catch (err) {
    if (typeof err === "string") message.reply(err)
    else {
      log(err);
      message.reply(
        "Command parsing failed. Please use the !pollen info command to see how to use the requested command properly."
      );
    }
  }
}

export async function checkDiscourse(message: Message): Promise<void> {
  try {
    const foundUser = await User.findOne({ discordId: message.author.id })

    if (!foundUser) 
      throw "You first need to save your wallet address with the `!pollen save-wallet <wallet-address>` command.";

    const [verification_code, username] = parseDiscourseCheck(
      message.content,
      message.author.id
    );

    if (verification_code && username) {
      const response = await handleDiscourseCheck(
        message.author.id,
        verification_code,
        username
      );

      message.author.send(response.message);

      if (response.ok) {
        await foundUser.updateOne(
          { discourse: username, modifiedAt: Date.now() }
        );
  
        message.author.send("Discourse user succesfully saved.");
      }
    }
  } catch (err) {
    if (typeof err === "string") message.reply(err)
    else {
      log(err);
      message.reply(
        "Command parsing failed. Please use the !pollen info command to see how to use the requested command properly."
      );
    }
  }
}
