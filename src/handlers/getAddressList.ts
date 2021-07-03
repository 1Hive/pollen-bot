import { Message, MessageAttachment } from "discord.js";
import { readFileSync, writeFileSync } from "fs";

import User from "../models/user";
import { error, loadLedger } from "../utils";

export default async function getAddressList(message: Message): Promise<void> {
  try {
    const ledger = await loadLedger()

    if (message.author.id !== process.env.POLLEN_ADMIN) 
      throw "You do not have access to this command.";

    const userAddressQuery = await User
      .find({})
      .select("discordId username address createdAt -_id")
      
    const userAddressList = Array
      .from(userAddressQuery)
      .map(user => {
        const ledgerAccount = ledger.accountByAddress(
          `N\u0000sourcecred\u0000discord\u0000MEMBER\u0000user\u0000${user.discordId}\u0000`
        )

        if (!ledgerAccount) return
        const ledgerName = ledgerAccount.identity.name
        
        return ({
          name: ledgerName,
          createdAt: user.createdAt,
          address: user.address
        })
      })

    const baseAddressList = JSON.parse(readFileSync("./base-addresses.json", "utf-8"))
    
    writeFileSync("addressList.json", JSON.stringify([...baseAddressList, ...userAddressList]))
  
    message.author.send(
      "Here's the list of users and their corresponding address:",
      new MessageAttachment("addressList.json")
    );
  } catch (err) {
    if (typeof err !== "string") error(err);
    message.reply(err)
  }
}
