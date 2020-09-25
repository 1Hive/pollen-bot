const Discord = require('discord.js')
const dotenv = require('dotenv')
// const detectHandler = require('./parser/detectHandler')
const { RequestHandlerError } = require('./error-utils')
const { log } = require('./utils')

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config()
// Sentry.init({ dsn: environment('SENTRY_DSN') })

const client = new Discord.Client()

client.on('ready', () => {
  log(`Bot successfully started as ${client.user.tag} 🐝`)
})

client.on('guildMemberAdd', (member) => {
  member.send({
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
  })
})

client.on('message', async (message) => {
  if (message.author.bot) return

  try {
    if (message.content.includes('app.brightid.org/connection-code')) {
      // Deletes the message inmediately.
      await message.delete({ timeout: 500 })

      // Sends a PM to the user, letting them know it is agains't the rules.
      await message.author.send({
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
      })

      log(
        `Deleted message with BrightID connection link from ${message.author}.`,
      )
    } else {
      // const handler = await detectHandler(message.content)
      // await handler(message)
      // log(
      //   `Served command ${message.content} successfully for ${message.author.username}.`,
      // )
    }
  } catch (err) {
    if (err instanceof RequestHandlerError) {
      await message.reply(
        'Could not find the requested command. Please use .hny help for more info.',
      )
    } else {
      log(`An error just happened: ${err}`)
    }
    // Sentry.captureException(err)
  }
})

client.login(process.env.DISCORD_API_TOKEN)
