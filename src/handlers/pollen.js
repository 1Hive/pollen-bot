const { pollenEmbed } = require('../embed')

module.exports = async function pollen(message) {
  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(pollenEmbed())
}
