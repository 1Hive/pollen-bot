import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import {
  verifyGithubEmbed,
  successGithubVerificationEmbed,
  errorGithubVerificationEmbed,
} from "../embed";

export async function handleGithubVerify(
  discord_id: string, 
  github_username: string
): Promise<{ discord: string, message: MessageEmbed }> {
  const verification_code = createVerificationCode();
  const message = verifyGithubEmbed(verification_code, github_username);
  
  tempStorage[discord_id] = verification_code;

  return { discord: discord_id, message }
}

export async function handleGithubCheck(
  discord_id: string,
  verification_code: string,
  github_username: string,
): Promise<{ message: MessageEmbed, ok: boolean }> {
  const response = await matchUser(
    discord_id,
    verification_code,
    github_username,
  );

  return response
}

// get user information from gist api
async function getUserGist(github_username: string) {
  const getSpecificUser_URL = `https://api.github.com/users/${github_username}/gists`;

  const responseJson = await fetch(getSpecificUser_URL).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Couldn't fetch user info.")
    }
  });

  let gistPollen;

  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].files["pollen.md"]) {
      const gistJson = await fetch(responseJson[i].url).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Couldn't fetch pollen gist.");
        }
      });

      gistPollen = gistJson.files["pollen.md"];
    }
  }

  return gistPollen
}

// main logic to match user
async function matchUser(
  discord_id: string, 
  verification_code: string, 
  github_username: string
): Promise<{ message: MessageEmbed, ok: boolean }> {
  let message: MessageEmbed, ok: boolean;

  if (verification_code !== tempStorage[discord_id]) {
    message = errorGithubVerificationEmbed(
      `You first need to submit this command:
      **!pollen verify-github ${github_username}**`
    );
    ok = false;

    return { message, ok }
  }

  const { content } = await getUserGist(github_username);

  if (content === verification_code) {
    message = successGithubVerificationEmbed(github_username);
    ok = true;
    
    delete tempStorage[discord_id];
  } else {
    message = errorGithubVerificationEmbed(
      "Your gist content doesn't match the verification code provided."
    );
    ok = false;
  }

  return { message, ok }
}

// generate random code for user
const createVerificationCode = (): string => Math.random().toString(36).substr(2, 10);
const tempStorage = {};
