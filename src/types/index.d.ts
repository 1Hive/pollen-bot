import { Message } from "discord.js";

export type PollenData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accounts: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credParticipants: any
};

export type CommandHandler = (message: Message, pollenData?: PollenData ) => Promise<void>