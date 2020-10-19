const { xDaiInfoEmbed } = require('../embed')

module.exports = async function help(message) {
  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(xDaiInfoEmbed())
}
