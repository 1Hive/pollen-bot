const BannedUser = require('../models/BannedUser')

module.exports = async function getPollenBanned(message) {
  if (
    message && message.author.id !== process.env.POLLEN_ADMIN
  ) return message.reply('You do not have access to this command.')

  try {          
    const foundUsers = await BannedUser.find().select('discordId username -_id')

    if (!foundUsers.length) {
      if (message) return message.author.send('I could not find any banned users.')
      else return undefined
    }

    const userList = foundUsers.map(user => `ID: \`${user.discordId}\`, username: \`${user.username}\``)

    if (message) message.author.send(userList.join('\n'))
    return foundUsers
  } catch (err) {
    console.log(err)
  }
}
