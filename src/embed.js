function welcomeEmbed() {
  return {
    embed: {
      title: 'Welcome to 1Hive! 🍯',
      description:
        'Please say hi in #:wave:intros to share how you found us and what interests you!',
      color: 16769024,
      fields: [
        {
          name: 'Frequently Asked Questions (FAQ) ❓',
          value: 'https://hackmd.io/ObCMUJUxTumG2z6FJ5cnkg',
        },
        {
          name: 'Get free honey 🤑',
          value: 'https://faucet.1hive.org/',
        },
        {
          name: 'Share your thoughts and feeling on our blog! 💭',
          value: 'https://forum.1hive.org/',
        },
        {
          name: 'Learn more about Honey (HNY) 🍯',
          value: 'https://blog.1hive.org/honey/',
        },
        {
          name: 'Announcements and recaps of all the things 📰',
          value: 'https://1hive.substack.com/ ',
        },
        {
          name: 'Documentation of our DAO 📝',
          value: 'https://about.1hive.org/docs/dao/',
        },
        {
          name: 'Detailed description all of our channels',
          value:
            'https://discordapp.com/channels/698287700834517064/758821739202347038/758886904078008363',
        },
      ],
    },
  }
}

function brightidWarningEmbed() {
  return {
    embed: {
      title: 'Warning 🚨',
      description:
        'You should not send BrightID connection links on public channels!',
      color: 16769024,
      fields: [
        {
          name: 'Want to get verified?',
          value:
            'The best way is to join a verification party at https://www.brightid.org/meet.',
        },
      ],
    },
  }
}

module.exports = { welcomeEmbed, brightidWarningEmbed }
