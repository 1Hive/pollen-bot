import { Message } from "discord.js";

import { RequestHandlerError } from "../error-utils";
import handlers from "../handlers";

const noop = () => undefined;

type PollenData = {
  accounts: unknown,
  credParticipants: unknown
};

type CommandHandler = (message: Message, pollenData?: PollenData ) => Promise<void>

export default function detectHandler(message: string): CommandHandler {

  const [requestedNamespace, requestedHandler] = message.split(" ");
  // If it's not a flag, we can safely ignore this command.
  if (!requestedNamespace.includes("!hny")) return noop();

  const receivedHandler = handlers.get(requestedHandler);

  if (typeof receivedHandler !== "function") {
    throw new RequestHandlerError(
      `Could not find command with flag ${requestedHandler}`,
    )
  }

  return receivedHandler;
}
