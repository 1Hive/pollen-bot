const { pollenEmbed } = require('../embed')

module.exports = async function help(message) {
  message.author.send(pollenEmbed())
}
