const { brightidEmbed } = require('../embed')

module.exports = async function brightid(message) {
  message.author.send(brightidEmbed())
}
