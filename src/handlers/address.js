const { honeyAddy } = require('../embed')

module.exports = async function address(message) {
  message.channel.send(honeyAddy())
}
