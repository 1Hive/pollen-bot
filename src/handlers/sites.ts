import { Message } from "discord.js";
import { sitesEmbed } from "../embed";

const links = {
  "Forum": "https://forum.1hive.org/",
  "Wiki": "https://wiki.1hive.org",
  "Discord": "https://discord.com/invite/P4rRDUKTAU",
  "1Hive Blog": "https://medium.com/1hive",
  "1Hive Community Covenent": "https://wiki.1hive.org/community-covenant",
  "1Hive Calendar": "https://wiki.1hive.org/getting-started/calendar",
  "Honeypot": "https://1hive.org/",
  "1Hive Github": "https://github.com/1Hive",
  "1Hive FAQ": "https://1hive.gitbook.io/1hive/guides/faq",
  "About Agave": "https://forum.1hive.org/t/announcing-agaave-aave-on-xdai/1792",
  "Honey Faucet": "https://faucet.1hive.org/#/",
  "Honeyswap": "https://honeyswap.org/",
  "Honeyswap Blog": "https://medium.com/honeyswap/",
  "Honeyswap Analytics": "https://info.honeyswap.org/"
}

const siteData = Object.keys(links).map(title => `**${title}** - ${links[title]}`).join("\n");

export default async function sites(message: Message): Promise<void> {
  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(sitesEmbed(siteData))
}
