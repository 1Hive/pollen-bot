/* eslint-disable quotes */
const Discord = require('discord.js')
const dotenv = require('dotenv')
const detectHandler = require('./parser/detectHandler')
const { RequestHandlerError } = require('./error-utils')
const { log } = require('./utils')
const fetchPrice = require('./handlers/price')

const {
  welcomeEmbed,
  brightidWarningEmbed,
  wrongChannelWarningEmbed,
} = require('./embed')

const externalCommands = ['!join', '!me', '!verify']
require('./db/connection')

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config()
// Sentry.init({ dsn: environment('SENTRY_DSN') })

const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] }, { ws: { intents: 'GUILD_MEMBERS' }})

client.on('ready', () => {
  log(`Bot successfully started as ${client.user.tag} 🐝`)
})

client.on('guildMemberAdd', (member) => {
  member.send(welcomeEmbed())
})

// Listen for reactions
client.on('messageReactionAdd', async (reaction, user) => {
  // check if not yet cached
  if (reaction.partial) {
    try {
      await reaction.fetch().then((reaction) => {
        if (reaction.message.author.bot) return

        if (user.id === reaction.message.author.id) {
          reaction.users.remove(reaction.message.author)
          log(
            `Deleted partial self react from user with id: ${reaction.message.author.id}`,
          )
        }
      })
    } catch (error) {
      log(`Uh oh, we couldn't fetch the message`, error)
      return
    }
    // if cached, handle here
  } else if (!reaction.partial) {
    if (reaction.message.author.bot) return

    if (user.id === reaction.message.author.id) {
      reaction.users.remove(reaction.message.author)
      log(
        `Deleted non partial self react from user with id: ${reaction.message.author.id}`,
      )
    }
  }
})

client.on('message', (message) => {
  if (message.author.bot) return
  try {
    if (message.content.includes('app.brightid.org/connection-code')) {
      // Deletes the message inmediately.
      message.delete({ timeout: 500 })

      // Sends a PM to the user, letting them know it is against the rules.
      message.author.send(brightidWarningEmbed())

      log(
        `Deleted message with BrightID connection link from ${message.author}.`,
      )
      // Check if external bot command && if channel is #bot-commands
    } else if (
      externalCommands.indexOf(message.content) > -1 &&
      message.channel.id !== process.env.CHANNEL_ID
    ) {
      message.delete({ timeout: 500 })
      message.author.send(wrongChannelWarningEmbed())
    } else {
      const handler = detectHandler(message.content)
      if (handler) {
        // Checks if channel is #bot-commands or message is NOT from guild
        if (
          message.channel.id === process.env.CHANNEL_ID ||
          message.guild === null
        ) {
          handler(message)
          log(
            `Served command ${message.content} successfully for ${message.author.username}.`,
          )
        } else {
          message.delete({ timeout: 500 })
          client.channels.fetch(process.env.CHANNEL_ID).then((channel) => {
            channel.send(`<@${message.author.id}>`)
            channel.send(wrongChannelWarningEmbed())
          })
          return
        }
      }
    }
  } catch (err) {
    if (err instanceof RequestHandlerError) {
      log(err)
      message.reply(
        'Could not find the requested command. Please use !hny help for more info.',
      )
    }
    // Sentry.captureException(err)
  }
})

client.setInterval(async () => {
  const price = await fetchPrice()
  await client.user.setActivity(`HNY price: $${price}`, { type: 'WATCHING' })
}, 1 * 60 * 1000)

client.login(process.env.DISCORD_API_TOKEN)
