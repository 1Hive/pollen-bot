const { brightidEmbed } = require('../embed')

module.exports = async function brightid(message) {
  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(brightidEmbed())
}
