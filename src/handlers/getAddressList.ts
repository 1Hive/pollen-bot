import { Message, MessageAttachment } from "discord.js";
import { writeFileSync } from "fs";

import User from "../models/user";
import { error } from "../utils";

export default async function getAddressList(message: Message): Promise<void> {
  try {
    if (message.author.id !== process.env.POLLEN_ADMIN) 
      throw "You do not have access to this command.";

    const userAddressList = await User
      .find({})
      .select("username address -_id");

    const formattedUserAddressList = JSON
      .stringify(userAddressList, null, 2)
      .replace(/username/g, "name")
      .replace(/#\d{4}/g, "")

    writeFileSync("addressList.json", formattedUserAddressList)
  
    message.author.send(
      "Here's the list of users and their corresponding address:",
      new MessageAttachment("addressList.json")
    );
  } catch (err) {
    if (typeof err !== "string") error(err);
    message.reply(err)
  }
}
