export function parseGithubVerification(message: string, discordId: string): string[] {
  // This discordId comes directly from the author of the message (discord.js)
  // Therefore, only two things can happen: get a valid ID or get 'undefined'.
  if (typeof discordId === "undefined") throw new Error(
    `Parsing command failed: reason: no Discord ID gathered from message, got ${discordId}`,
  );

  if (typeof message !== "string") throw new Error(
    `Parsing command failed, reason: wrong type passed in. Expected string, got ${typeof message}`,
  );

  if (message === "") throw new Error("Parsing command failed: reason: empty string provided as message");

  // Split the signup message by whitespace,
  // and remove the first two items (!hny verify-discourse flag)
  const splitMessage = message.split(" ").slice(2);
  if (splitMessage.length === 0) throw new Error("Parsing command failed, reason: no arguments were provided");

  if (splitMessage.length < 1) throw new Error(
    "Parsing command failed, reason: not enough arguments. Expecting a minimum of one: the discourse username.",
  );

  return splitMessage;
}

export function parseGithubCheck(message: string, discordId: string): string[] {
  // This discordId comes directly from the author of the message (discord.js)
  // Therefore, only two things can happen: get a valid ID or get 'undefined'.
  if (typeof discordId === "undefined") throw new Error(
    `Parsing command failed: reason: no Discord ID gathered from message, got ${discordId}`,
  );

  if (typeof message !== "string") throw new Error(
    `Parsing command failed, reason: wrong type passed in. Expected string, got ${typeof message}`,
  );

  if (message === "") throw new Error("Parsing command failed: reason: empty string provided as message");

  // Split the signup message by whitespace,
  // and remove the first two items (!hny verify-discourse flag)
  const splitMessage = message.split(" ").slice(2);

  if (splitMessage.length < 2) throw new Error(
    "Parsing command failed, reason: not enough arguments. Expecting a minimum of two: the verification code and github username.",
  );

  return splitMessage;
}
