// import { Message } from "discord.js";

// import BannedUser from "../models/BannedUser";
// import { error } from "../utils";

// export default async function pollenunban(message: Message): Promise<void> {
//   if (message.author.id !== process.env.POLLEN_ADMIN) throw "You do not have access to this command.";
//   if (message.channel.type === "dm") throw "Try again in the Bot Commands channel.";

//   const userIds: string[] = message.content.split(" ").slice(2);

//   if (!userIds.length) throw "Please, specify the users IDs";
  
//   const userTags: string[] = [];

//   try {
//     for (const userId of userIds) {
//       const userWasBanned: boolean = await BannedUser.exists({ discordId: userId });

//       if (!userWasBanned) continue;

//       const userUnbanned = await BannedUser.findOneAndDelete({ discordId: userId })
//       userTags.push(userUnbanned.username)
//     }
    
//     if (!userTags.length) throw "The users you specified could not be found on the banned users list";

//     message.reply(
//       userTags.length > 1
//         ? `users \`${userTags.join(", ")}\` are no longer banned from pollen.`
//         : `user \`${userTags[0]}\` is no longer banned from pollen.`
//     )
//   } catch (err) {
//     if (typeof err !== "string") error(err);
//     message.reply(err);
//   }
// }
