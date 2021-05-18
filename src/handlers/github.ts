import { Message } from "discord.js";

import {
  handleGithubVerify,
  handleGithubCheck,
} from "../lib/github-verification";
import {
  parseGithubVerification,
  parseGithubCheck,
} from "../parser/github";
import User from "../models/user";
import { log } from "../utils";

export async function verifyGithub(message: Message): Promise<void> {
  try {
    const [ username ] = parseGithubVerification(
      message.content,
      message.author.id,
    );

    if (username) {
      const response = await handleGithubVerify(message.author.id, username);
      message.author.send(response.message);
    }
  } catch (err) {
    log(err);
    message.reply(
      "Command parsing failed. Please use the !pollen info command to see how to use the requested command properly."
    );
  }
};

export async function checkGithub(message: Message): Promise<void> {
  try {
    const [ verification_code, username ] = parseGithubCheck(
      message.content,
      message.author.id,
    );

    if (verification_code && username) {
      const response = await handleGithubCheck(
        message.author.id,
        verification_code,
        username,
      );

      message.author.send(response.message);

      if (response.ok) {
        await User.findOneAndUpdate(
          { discordId: message.author.id, username: message.author.tag },
          { github: username, modifiedAt: Date.now() },
          { upsert: true }
        );
  
        message.author.send("GitHub user succesfully saved.");
      }
    }
  } catch (err) {
    log(err);
    message.reply(
      "Command parsing failed. Please use the !pollen info command to see how to use the requested command properly."
    );
  }
};
