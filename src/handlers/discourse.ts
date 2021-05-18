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
    const [username] = parseDiscourseVerification(
      message.content,
      message.author.id
    );
    if (username) {
      const response = await handleDiscourseVerify(message.author.id, username);
      message.author.send(response.message);
    }
  } catch (err) {
    log(err);
    message.reply(
      "Command parsing failed. Please use the !pollen info command to see how to use the requested command properly."
    );
  }
}

export async function checkDiscourse(message: Message): Promise<void> {
  try {
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
        await User.findOneAndUpdate(
          { discordId: message.author.id, username: message.author.tag },
          { discourse: username, modifiedAt: Date.now() },
          { upsert: true }
        );
  
        message.author.send("Discourse user succesfully saved.");
      }
    }
  } catch (err) {
    log(err);
    message.reply(
      "Command parsing failed. Please use the !pollen info command to see how to use the requested command properly."
    );
  }
}
