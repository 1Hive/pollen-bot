const BannedUser = require('../models/BannedUser')

module.exports = async function pollenunban(message) {
  if (message.author.id !== process.env.POLLEN_ADMIN) return message.reply('You do not have access to this command.')
  if (message.channel.type === 'dm') return message.reply('Try again in the Bot Commands channel.')

  const userIds = message.content
    .split(' ')
    .slice(2)

  if (!userIds.length) return message.reply('Please, specify the users IDs')
  
  const userTags = []

  try {
    for (const userId of userIds) {
      const userWasBanned = await BannedUser.exists({ discordId: userId })

      if (!userWasBanned) continue

      const userUnbanned = await BannedUser.findOneAndDelete({ discordId: userId })
      userTags.push(userUnbanned.username)
    }
    
    if (!userTags.length) return message.reply('The users you specified could not be found on the banned users list')

    message.reply(
      userTags.length > 1
        ? `users \`${userTags.join(', ')}\` are no longer banned from pollen.`
        : `user \`${userTags[0]}\` is no longer banned from pollen.`
    )
  } catch (err) {
    message.reply(err)
  }
}
