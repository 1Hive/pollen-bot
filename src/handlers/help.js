const { helpEmbed } = require('../embed')

module.exports = async function help(message) {
  message.author.send(helpEmbed())
}
