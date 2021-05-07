/* eslint-disable quotes */
import { Client, TextChannel } from "discord.js";
import * as dotenv from "dotenv";
import { CronJob } from "cron";

import detectHandler from "./parser/detectHandler";
import { RequestHandlerError } from "./error-utils";
import { log } from "./utils";
import updateroles from "./handlers/updateRoles";
import { fetchPollenData } from "./utils";

import { wrongChannelWarningEmbed } from "./embed";

require("./db/connection");

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config();
// Sentry.init({ dsn: environment('SENTRY_DSN') })

const client = new Client({
  partials: ["MESSAGE", "REACTION"],
  ws: { 
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MEMBERS",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS"
    ]
  },
});

client.on("ready", () => {
  log(`Bot successfully started as ${client.user.tag} 🐝`);
});

client.on("message", (message) => {
  if (message.author.bot) return;

  // Gets the Bot-commands channel ID.
  const BOT_COMMANDS_CHANNEL_ID =
    message.channel.type === "dm"
      ? message.channel.id
      : message.guild.channels.cache.find((channel) => {
          return channel.name.includes("bot-commands");
        }).id;

  try {
    const handler = detectHandler(message.content);
    if (handler) {
      // Checks if channel is #bot-commands or message is NOT from guild
      if (
        message.channel.id === BOT_COMMANDS_CHANNEL_ID ||
        message.guild === null
      ) {
        handler(message, pollenData);
        log(
          `Served command ${message.content} successfully for ${message.author.username}.`
        );
      } else {
        message.delete({ timeout: 500 });
        client.channels.fetch(BOT_COMMANDS_CHANNEL_ID).then((channel) => {
          (channel as TextChannel).send(`<@${message.author.id}>`);
          (channel as TextChannel).send(wrongChannelWarningEmbed());
        });
        return;
      }
    }
  } catch (err) {
    if (err instanceof RequestHandlerError) {
      log(`${err}`);
      message.reply(
        "Could not find the requested command. Please use !pollen help for more info."
      );
    }
    // Sentry.captureException(err)
  }
});

// Preloads pollen data on bot start as well as every 6 hours
let pollenData;

// eslint-disable-next-line
const pollenDataUpdate = new CronJob(
  "0 */6 * * *",
  async () => {
    // pollenData = await fetchPollenData();
    // start: true, runOnInit: true
  },
  null,
  true,
  null,
  null,
  true
);

// Runs the pollen updateRoles function periodically at 12am and 12pm UTC
// eslint-disable-next-line
const midnightRoleUpdate = new CronJob(
  "00 00 00 * * *",
  () => {
    console.log("Updating roles...");
    updateroles(null, pollenData);
    // start: true
  },
  null,
  true,
  "Europe/London"
);

// eslint-disable-next-line
const middayRoleUpdate = new CronJob(
  "00 00 12 * * *",
  () => {
    console.log("Updating roles...");
    updateroles(null, pollenData);
    // start: true
  },
  null,
  true,
  "Europe/London"
);

client.login(process.env.DISCORD_API_TOKEN);
