const { credEmbed } = require('../embed')
const { error } = require('../utils')

module.exports = async function mycred(message, pollenData) {
  if (!pollenData) return message.reply('Still preloading pollen files, try again in a minute.')

  const { accounts, credParticipants } = pollenData

  const accountFound = accounts
    .find(account => account.identity.aliases.some(alias => alias.address.includes(message.author.id)))
  
  if(!accountFound) return message.reply('Alas, we cannot find you, try again tomorrow!')

  const credParticipant = credParticipants.find(p => p.id === accountFound.identity.id)
  const credHistory = credParticipant.credPerInterval

  try {
    await message.channel.send(`<@${message.author.id}>`)
    await message.channel.send(credEmbed(
      credParticipant.cred,
      credHistory[credHistory.length -2],
      credHistory[credHistory.length - 1]
    ))
  } catch (err) {
    error(err)
    message.reply(`An error has occurred: ${err}`)
  }
}
