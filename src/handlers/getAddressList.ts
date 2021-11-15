import { Message, MessageAttachment } from "discord.js";
import { readFileSync, writeFileSync } from "fs";

import User from "../models/user";
import { error, loadLedger } from "../utils";

export default async function getAddressList(message: Message): Promise<void> {
  try {
    const ledger = await loadLedger()

    if (!process.env.POLLEN_ADMIN.includes(message.author.id)) 
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

    // Removes duplicates by filtering out the first address found per user 
    // in case more than 1 is found (second address is the one updated on the DB)
    const mergedList = [...baseAddressList, ...userAddressList]
      .reverse()
      .filter(user => user !== undefined)
    const filteredList = mergedList
      .filter(
        (user, index) => index === mergedList.findIndex(elem => elem.name === user.name)
      )
      .reverse()
    
    writeFileSync("addressList.json", JSON.stringify(filteredList))
  
    message.author.send({
      content: "Here's the list of users and their corresponding address:",
      files: [ new MessageAttachment("addressList.json") ]
    });
  } catch (err) {
    if (typeof err !== "string") error(err);
    message.reply(err)
  }
}
