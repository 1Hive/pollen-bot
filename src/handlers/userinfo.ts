import { Message } from "discord.js";

import User from "../models/user";
import { error } from "../utils";

export default async function userinfo(message: Message): Promise<void> {
  try {
    const foundUser = await User.findOne(
      { discordId: message.author.id, username: message.author.tag }
    ).select("-_id -discordId -modifiedAt");

    if (!foundUser) message.reply(
      "We could not find you on the DB, please send `!pollen info` to know how to get onboarded."
    );
    else {
      const strUser = foundUser.toString();
      const formattedUser = strUser
        .substring(2, strUser.length - 2)
        .replace(/, /g, "\n");

      message.reply(
        "this is your current pollen saved information:\n```" + formattedUser + "```"
      );
    }
  } catch (err) {
    error(err);
    message.reply(err);
  }
}