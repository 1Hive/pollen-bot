import { Message, Client } from "discord.js";
import { Document } from "mongoose";

export type CommandHandler = (message: Message, client?: Client) => Promise<void>

export interface IAccount extends Document {
  identity: {
    id: string,
    subtype: string,
    aliases: string[]
  }
}

export interface IBannedUser extends Document {
  discordId: string,
  username: string
}

export interface ICredParticipant extends Document {
  credPerInterval: number[],
  cred: number,
  id: string
}
