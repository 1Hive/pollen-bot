const {
  handleDiscourseVerify,
  handleDiscourseCheck,
} = require('../lib/discourse-gatherer')
const {
  parseDiscourseVerification,
  parseDiscourseCheck,
} = require('../parser/discourse')

const { log } = require('../utils')

async function verifyDiscourse(message) {
  try {
    const [username] = parseDiscourseVerification(
      message.content,
      message.author.id,
    )
    if (username) {
      const response = await handleDiscourseVerify(message.author.id, username)
      message.author.send(response.message)
    }
  } catch (err) {
    log(err)
    message.reply(
      'Command parsing failed. Please use the !hny help command to see how to use the requested command properly.',
    )
  }
}

async function checkDiscourse(message) {
  try {
    const [verification_code, username] = parseDiscourseCheck(
      message.content,
      message.author.id,
    )
    if (verification_code && username) {
      const response = await handleDiscourseCheck(
        message.author.id,
        verification_code,
        username,
      )
      message.author.send(response.message)
    }
  } catch (err) {
    log(err)
    message.reply(
      'Command parsing failed. Please use the !hny help command to see how to use the requested command properly.',
    )
  }
}

module.exports = { verifyDiscourse, checkDiscourse }
