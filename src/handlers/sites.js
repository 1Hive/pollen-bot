const { sitesEmbed } = require('../embed')
const links = {'Forum': 'https://forum.1hive.org/',
  'Wiki': 'https://wiki.1hive.org',
  'Discord': 'https://discord.com/invite/P4rRDUKTAU',
  'About 1Hive': 'https://about.1hive.org/',
  '1Hive handbook': 'https://about.1hive.org/docs/dao',
  '1Hive Blog': 'https://about.1hive.org/blog/',
  '1Hive Community Covenent': 'https://wiki.1hive.org/community-covenant',
  '1Hive Calendar': 'https://wiki.1hive.org/getting-started/calendar',
  'Honeypot': 'https://1hive.org/',
  'Github': 'https://github.com/1Hive',
  '1Hive FAQ': 'https://1hive.gitbook.io/1hive/guides/faq',
  'Celeste': 'https://wiki.1hive.org/projects/celeste',
  'Gardens': 'https://wiki.1hive.org/projects/gardens',
  '1Hive Milestones': 'https://wiki.1hive.org/projects/milestones',
  'All about Swarms in 1Hive': 'https://wiki.1hive.org/community/swarms',
  'Honey Faucet': 'https://faucet.1hive.org/#/',
  'Honeycomb': 'https://hny.farm/',
  'Honeyswap': 'https://honeyswap.org/',
  'Honeyswap Docs': 'https://about.1hive.org/docs/honeyswap/',
  'Honeyswap Analytics': 'https://info.honeyswap.org/'}

const siteData = Object.keys(links).map(title => `**${title}** - ${links[title]}`).join('\n')
module.exports = async function sites(message) {
  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(sitesEmbed(siteData))
}
