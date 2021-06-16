import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import {
  verifyDiscourseEmbed,
  successDiscourseVerificationEmbed,
  errorDiscourseVerificationEmbed,
} from "../embed";

// external function that will be called by the discord app when user confirms it has changed the name with the verification_code
// the discord_id can be changed by any other identifier like a wallet address in the future

// discord_id of user is Mandatory!  verification_code should only be sent if the user uses the " !pollen discourse_check ${verification_code} " code

export async function handleDiscourseVerify(
  discord_id: string,
  discourse_username: string
): Promise<{ discord: string, message: MessageEmbed }> {
  const verification_code = createVerificationCode();
  const message = verifyDiscourseEmbed(verification_code, discourse_username);
  
  tempStorage[discord_id] = verification_code;
  
  return { discord: discord_id, message }
}

export async function handleDiscourseCheck(
  discord_id: string,
  verification_code: string,
  discourse_username: string,
): Promise<{ message: MessageEmbed, ok: boolean, username: string }> {
  const response = await matchUser(
    discord_id,
    verification_code,
    discourse_username,
  );
  return response
}

// get user information from discourse api
async function getSpecificUser(discourse_username: string) {
  const getSpecificUser_URL = `https://forum.1hive.org/users/${discourse_username}.json`;

  const userJson = await fetch(getSpecificUser_URL).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Couldn't fetch user info.");
    }
  });

  return userJson
}

// main logic to match user
async function matchUser(
  discord_id: string, 
  verification_code: string, 
  discourse_username: string
): Promise<{ message: MessageEmbed, ok: boolean, username: string }> {
  let message: MessageEmbed, ok: boolean;

  if (verification_code !== tempStorage[discord_id]) {
    message = errorDiscourseVerificationEmbed(
      `You first need to submit this command:
      **!pollen verify-discourse ${discourse_username}**`
    );
    ok = false;

    return { message, ok, username: "" }
  };

  const { user } = await getSpecificUser(discourse_username);

  if (user.name === verification_code) {
    message = successDiscourseVerificationEmbed(discourse_username);
    ok = true;

    delete tempStorage[discord_id];
  } else {
    message = errorDiscourseVerificationEmbed(
      "We couldn't find the verification code in your discourse profile, could you double check your code has been saved in the 'Name' field of your account?",
    );
    ok = false;
  };

  return { message, ok, username: user.username }
}

// generate random code for user
const createVerificationCode = (): string => Math.random().toString(36).substr(2, 10);
const tempStorage = {};
