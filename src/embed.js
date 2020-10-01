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
      timestamp: new Date(),
      footer: {
        text: 'about.1hive.org',
      },
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
      timestamp: new Date(),
      footer: {
        text: 'about.1hive.org',
      },
    },
  }
}

function helpEmbed() {
  return {
    embed: {
      color: 16769024,
      author: {
        name: 'Assistant Bee',
        url: 'https://github.com/crisog/assistant-bee'
      },
      description: 'Hi, my name\'s Assistant Bee, I\'m 1hive\'s helper. All my commands are prefixed by `!hny`. Refer to the list below for my full functionality!',
      thumbnail: {
        url: 'https://i.imgur.com/dRxtULu.png',
      },
      fields: [
        {
          name: 'FAQ',
          value: 'For a full overview on 1hive, HNY and brightID verification, please check out the [FAQ](https://forum.1hive.org/t/everything-about-1hive-in-one-place-newfaq-in-development/180).',
        },
        {
          name: '!hny address',
          value: 'Displays HNY\'s contract address',
        },
        {
          name: '!hny pollen',
          value: '[Pollen](https://about.1hive.org/docs/dao/Participation/pollen/) is a contributor rank used to recognize contributions to the Hive. Refer to the command for more information.',
        },
      ],
      image: {
        url: 'https://i.imgur.com/E7x8s0j.png',
      },
      timestamp: new Date(),
      footer: {
        text: 'about.1hive.org',
      },
    },
  }
}

function pollenEmbed() {
  return {
    embed: {
      color: 16769024,
      author: {
        name: 'Assistant Bee',
        url: 'https://github.com/crisog/assistant-bee'
      },
      description: '[Pollen](https://about.1hive.org/docs/dao/Participation/pollen/) is a contributor rank used to recognize contributions to 1hive’s discord, discourse, and github communities. These contributions are rewarded with weekly distributions of Honey.',
      thumbnail: {
        url: 'https://i.imgur.com/dRxtULu.png',
      },
      fields: [
        {
          name: 'Signing up',
          value: 'To sign up for Pollen, post in the <#708187332154753065> channel with your relevant IDs and a tag to the <#749003215940485180> channel. An example post is included in the image below.',
        },
        {
          name: 'Future of Pollen',
          value: 'Onboarding is currently done manually, in the future we will attempt to automate this process.',
        }
      ],
      image: {
        url: 'https://i.imgur.com/2OFG47E.png',
      },
      timestamp: new Date(),
      footer: {
        text: 'about.1hive.org',
      },
    }
  }
}

function honeyAddy() {
  return {
    embed: {
      title: '$HNY Token 🍯',
      color: 16769024,
      fields: [
        {
          name: 'Address',
          value: '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9',
        },
      ],
      timestamp: new Date(),
      footer: {
        text: 'about.1hive.org',
      },
    },
  }
}

module.exports = { welcomeEmbed, brightidWarningEmbed, helpEmbed, pollenEmbed, honeyAddy }
