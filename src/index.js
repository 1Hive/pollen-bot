const Discord = require('discord.js')
const dotenv = require('dotenv')
const { log } = require('./utils')

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config()
// Sentry.init({ dsn: environment('SENTRY_DSN') })

const client = new Discord.Client()

client.on('ready', () => {
  log(`Bot successfully started as ${client.user.tag} 🐝`)
})

client.on('message', async message => {
  if(message.author.bot) return

  try {
    if (message.content.includes('app.brightid.org/connection-code')) {
      // Deletes the message inmediately.
      message.delete({ timeout: 500 })

      // Sends a PM to the user, letting them know it is agains't the rules.
      message.author.send({embed: {
        author: {
          name: 'Bee Guard 🚨',
          icon_url: 'https://www.wholekidsfoundation.org/assets/images/Worker-Bee-Roles_Guard.png'
        },
        color: 3447003,
        description: 'You should not public BrightID connection links on public channels!',
        fields: [{
          name: 'Want to get verified?',
          value: 'The best way is to join a verification party at https://www.brightid.org/meet.'
        }
        ],
      }})
        
      log(`Deleted message with BrightID connection link from ${message.author}.`)
    }
  } catch (err) {
    log(`An error just happened: ${err}`)
    // Sentry.captureException(err)
  }
})

client.login(process.env.DISCORD_API_TOKEN)