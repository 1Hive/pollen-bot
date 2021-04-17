const BannedUser = require('../models/BannedUser')

module.exports = async function pollenban(message) {
  if (message.author.id !== process.env.POLLEN_ADMIN) return message.reply('You do not have access to this command.')
  if (message.channel.type === 'dm') return message.reply('Try again in the Bot Commands channel.')

  const userIds = message.content
    .split(' ')
    .slice(2)

  if (!userIds.length) return message.reply('Please, specify the users IDs')
  
  const userList = userIds.map(userId => {
    const memberFound = message.guild.members.cache.get(userId)

    return memberFound
      ? memberFound.user.tag
      : undefined
  })

  if (userList.some(user => !user)) return message.reply(
    `Member with id ${userIds[userList.indexOf(undefined)]} was not found on the server.`
  )

  const emoji = (await message.guild.emojis.cache.find(em => em.name === 'memepolice')) || '👮‍♂️'

  message.reply(`to ban these users from pollen, react to the following message with ${emoji}`)
  const messageToConfirm = await message.channel.send('- ' + userList.join('\n- '))
  messageToConfirm.react(emoji)

  const filter = (reaction, user) => reaction.emoji === emoji && user.id === process.env.POLLEN_ADMIN
  const collector = messageToConfirm.createReactionCollector(filter, { max: 1, time: 30000 })
  collector.on('collect', () => banUsers(userList, message))
}

const banUsers = async (users, message) => {
  // Roles 0.25x, 0.5x, 0.75x and 1x respectively
  const roles = ['774874504358133780', '771534378110287913', '774874617432244284', '771534371588276274']

  try {
    for (const username of users) {
      const member = message.guild.members.cache
        .find(m => m.user.tag === username)
      const memberId = member.id

      const userWasBanned = await BannedUser.exists({ discordId: memberId })

      if (!userWasBanned) await BannedUser.create({
        discordId: memberId,
        username
      })

      for (const role of roles) if(member.roles.cache.has(role)) member.roles.remove(role)
    }

    message.reply(
      users.length > 1
        ? 'users were banned from pollen.'
        : 'user was banned from pollen.'
    )
  } catch (err) {
    message.reply(err)
  }
}