import { GuildMember, Message } from "discord.js";
import { sourcecred } from "sourcecred";
import * as dotenv from "dotenv";

// import getPollenBanned from "./getPollenBanned";
import { error } from "../utils";
import { PollenData } from "../types";

dotenv.config();

const NodeAddress = sourcecred.core.address.makeAddressModule({
  name: "NodeAddress",
  nonce: "N",
  otherNonces: new Map().set("E", "EdgeAddress")
});

export default async function updateroles(message: Message, pollenData: PollenData): Promise<void> {
  try {
    if (message && message.author.id !== process.env.POLLEN_ADMIN) throw "You do not have access to this command.";
    if (message && message.channel.type === "dm") throw "Try again in the bot-commands channel.";
    if (!pollenData) throw "Still preloading pollen files, try again in a minute.";
      
    // const bannedMembers = await getPollenBanned();
    const { accounts, credParticipants } = pollenData;
    const usersToModify: Map<string, number> = new Map();
    
    await message.channel.send("Updating pollen roles...");
    
    for (const account of accounts) {
      if (account.identity.subtype !== "USER") continue;

      const discordAliases = account.identity.aliases.filter(alias => alias.address.includes("discord"));

      if (!discordAliases.length) continue;

      let discordId: string;
      discordAliases.forEach(alias => discordId = NodeAddress.toParts(alias.address)[4]);
      
      // if (
      //   bannedMembers 
      //   && bannedMembers.length 
      //   && bannedMembers.some(member => member.discordId === discordId)
      // ) continue;

      const totalCred: number = credParticipants.find(p => p.id === account.identity.id).cred;
        
      if (discordId && totalCred >= 30) usersToModify.set(discordId, totalCred);
    }

    let count = 0;
    const guild = message.guild;

    for (const [id, cred] of usersToModify.entries()) {
      const member = guild.members.cache.get(id);

      if (member) {
        const newMemberRoles = manageRoles(member, cred);
        await member.roles.set(newMemberRoles);
        console.log(`User ${member.user.username} had their roles changed to: ${member.roles.cache.array()}`);
        count++;
      }
    }
    // If called by Pollen Admin on Discord...
    if (message) message.reply(`${count} users had their roles changed.`)
  } catch (err) {
    if (typeof err !== "string") error(err);
    if (message) message.reply(err);
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
