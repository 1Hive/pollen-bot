// import { Message } from "discord.js";

// import BannedUser from "../models/BannedUser";
// import { error } from "../utils";

// type User = {
//   discordId: string,
//   username: string
// }

// export default async function getPollenBanned(message?: Message): Promise<void | User[]> {
//   try {          
//     if (
//       message && message.author.id !== process.env.POLLEN_ADMIN
//     ) throw "You do not have access to this command.";

//     const foundUsers: User[] = await BannedUser.find().select("discordId username -_id");

//     if (!foundUsers.length) {
//       if (message) throw "I could not find any banned users.";
//       else return undefined;
//     }

//     const userList = foundUsers.map(user => `ID: \`${user.discordId}\`, username: \`${user.username}\``);

//     if (message) message.author.send(userList.join("\n"));
//     else return foundUsers
//   } catch (err) {
//     if (typeof err !== "string") error(err);
//     console.log(err)
//   }
// }
