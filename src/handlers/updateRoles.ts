import { GuildMember, Message, Client } from "discord.js";
import { sourcecred } from "sourcecred";
import { config } from "dotenv";

import Account from "../models/Account";
import CredParticipant from "../models/CredParticipant";

import getPollenBanned from "./getPollenBanned";
import { error } from "../utils";

config();

const NodeAddress = sourcecred.core.address.makeAddressModule({
  name: "NodeAddress",
  nonce: "N",
  otherNonces: new Map().set("E", "EdgeAddress")
});

export default async function updateroles(message: Message, client?: Client): Promise<void> {
  try {
    if (message && message.author.id !== process.env.POLLEN_ADMIN) throw "You do not have access to this command.";
    if (message && message.channel.type === "dm") throw "Try again in the bot-commands channel.";
      
    const bannedMembers = await getPollenBanned();
    const accounts = await Account.find({});
    const credParticipants = await CredParticipant.find({});
    const usersToModify: Map<string, number> = new Map();
    
    if (message) await message.channel.send("Updating pollen roles...");
    else console.log("Updating pollen roles...")
    
    for (const account of accounts) {
      if (account.identity.subtype !== "USER") continue;

      const discordAliases = account.identity.aliases.filter(alias => alias.includes("discord"));

      if (!discordAliases.length) continue;

      let discordId: string;
      discordAliases.forEach(alias => discordId = NodeAddress.toParts(alias)[4]);
      
      if (
        bannedMembers 
        && bannedMembers.length 
        && bannedMembers.some(member => member.discordId === discordId)
      ) continue;

      const participant = credParticipants.find(p => p.id === account.identity.id);
      if (!participant) continue;

      const totalCred = participant.cred;
        
      if (discordId && totalCred >= 30) usersToModify.set(discordId, totalCred);
    }
    
    console.log(usersToModify.size)

    let count = 0;
    const guild = message 
      ? message.guild
      : await client.guilds.fetch(process.env.GUILD_ID);

    for (const [id, cred] of usersToModify.entries()) {
      const member = guild.members.cache.get(id);
      console.log(member)

      if (member) {
        const newMemberRoles = manageRoles(member, cred);
        await member.roles.set(newMemberRoles);
        console.log(`User ${member.user.username} had their roles changed to: ${member.roles.cache.array()}`);
        count++;
      }
      // Waits 1.15 seconds before executing next iteration to prevent hitting Discord API Rate Limitation
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
    
    // If called by Pollen Admin on Discord...
    if (message) message.reply(`${count} users had their roles changed.`);
    else console.log(`${count} users had their roles changed.`);
  } catch (err) {
    if (typeof err !== "string") error(err);
    else if (message) message.reply(err);
  }
}

function manageRoles(member: GuildMember, totalCred: number): string[] {
  // Roles 0.25x, 0.5x, 0.75x and 1x respectively
  const roles = ["774874504358133780", "771534378110287913", "774874617432244284", "771534371588276274"];

  const memberRoles: string[] = member.roles.cache
    .map(role => role.id)
    .filter(role => !roles.includes(role));

  if (totalCred >= 30 && totalCred < 60) memberRoles.push(roles[0]);
  else if (totalCred >= 60 && totalCred < 90) memberRoles.push(roles[1]);
  else if (totalCred >= 90 && totalCred < 120) memberRoles.push(roles[2]);
  else if (totalCred >= 120) memberRoles.push(roles[3]);

  return memberRoles;
}
