import { Message } from "discord.js";

import User from "../models/user";
import { error } from "../utils";

export default async function userinfo(message: Message): Promise<void> {
  try {
    const foundUser = await User.findOne(
      { discordId: message.author.id, username: message.author.tag }
    ).select("-_id -modifiedAt -createdAt");

    if (!foundUser) message.reply(
      "We could not find you on the DB, please send `!pollen info` to know how to get onboarded."
    );
    else {
      if (message.channel.type !== "DM") message.reply("Check DM.");
      message.author.send(
        "this is your current pollen saved information:\n```" + JSON.stringify(foundUser,  null, 2) + "```"
      );
    }
  } catch (err) {
    error(err);
    message.reply(err);
  }
}