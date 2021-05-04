import { Message } from "discord.js";

import { IBannedUser } from "../types";
import BannedUser from "../models/BannedUser";
import { error } from "../utils";

export async function getPollenBannedMsg(message: Message): Promise<void> {
  try {          
    if (
      message && message.author.id !== process.env.POLLEN_ADMIN
    ) throw "You do not have access to this command.";

    const bannedMembers = await getPollenBanned();

    if (!bannedMembers) throw "I could not find any banned users.";

    const userList = bannedMembers.map(user => `ID: \`${user.discordId}\`, username: \`${user.username}\``);
  
    message.author.send(userList.join("\n"));
  } catch (err) {
    if (typeof err !== "string") error(err);
    message.reply(err)
  }
}

export default async function getPollenBanned(): Promise<IBannedUser[]> {
  try {          
    const foundUsers = await BannedUser.find().select("discordId username -_id");

    if (!foundUsers.length) return undefined;
    else return foundUsers
  } catch (err) {
    error(err);
  }
}
