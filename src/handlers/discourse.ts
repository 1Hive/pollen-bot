import {
  handleDiscourseVerify,
  handleDiscourseCheck,
} from "../lib/discourse-verification";
import {
  parseDiscourseVerification,
  parseDiscourseCheck,
} from "../parser/discourse";
import { dbHandler } from "../utilities/db";

import { Message } from "discord.js";
import { log } from "../utils";

async function verifyDiscourse(message: Message): Promise<void> {
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
      "Command parsing failed. Please use the !hny help command to see how to use the requested command properly."
    );
  }
}

async function checkDiscourse(message: Message): Promise<void> {
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
      dbHandler(message, username, null, null);
    }
  } catch (err) {
    log(err);
    message.reply(
      "Command parsing failed. Please use the !hny help command to see how to use the requested command properly."
    );
  }
}

export default { verifyDiscourse, checkDiscourse };
