const Discord = require('discord.js')
const dotenv = require('dotenv')
const detectHandler = require('./parser/detectHandler')
const listenSwaps = require('./handlers/listenSwaps')
const { RequestHandlerError } = require('./error-utils')
const { log } = require('./utils')

const {
  welcomeEmbed,
  brightidWarningEmbed,
  wrongChannelWarningEmbed,
} = require('./embed')

const externalCommands = ['!join', '!me', '!verify']

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config()
// Sentry.init({ dsn: environment('SENTRY_DSN') })

const client = new Discord.Client()

client.on('ready', () => {
  log(`Bot successfully started as ${client.user.tag} 🐝`)
  // Initialize swaps monitor
  listenSwaps(client)
})

client.on('guildMemberAdd', (member) => {
  member.send(welcomeEmbed())
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
      message.channel.id !== '762377613062701146'
    ) {
      message.delete({ timeout: 500 })
      message.author.send(wrongChannelWarningEmbed())
    } else {
      const handler = detectHandler(message.content)
      if (handler) {
        // Checks if channel is #bot-commands or message is NOT from guild
        if (
          message.channel.id === '762377613062701146' ||
          message.guild === null
        ) {
          handler(message)
          log(
            `Served command ${message.content} successfully for ${message.author.username}.`,
          )
        } else {
          message.delete({ timeout: 500 })
          message.author.send(wrongChannelWarningEmbed())
          return
        }
      }
    }
  } catch (err) {
    if (err instanceof RequestHandlerError) {
      message.reply(
        'Could not find the requested command. Please use !hny help for more info.',
      )
    } else {
      log(`An error just happened: ${err}`)
    }
    // Sentry.captureException(err)
  }
})

client.login(process.env.DISCORD_API_TOKEN)
