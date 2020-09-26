const { honeyAddy } = require('../embed')

module.exports = async function getHoneyAddy(message) {
  message.channel.send(honeyAddy())
}
