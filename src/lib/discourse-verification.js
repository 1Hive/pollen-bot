const fetch = require('node-fetch')
const {
  verifyDiscourseEmbed,
  successDiscourseVerificationEmbed,
  errorDiscourseVerificationEmbed,
} = require('../embed')

// external function that will be called by the discord app when user confirms it has changed the name with the verification_code
// the discord_id can be changed by any other identifier like a wallet address in the future

// discord_id of user is Mandatory!  verification_code should only be sent if the user uses the " !hny discourse_check ${verification_code} " code

async function handleDiscourseVerify(discord_id, discourse_username) {
  const verification_code = createVerificationCode()
  const message = verifyDiscourseEmbed(verification_code, discourse_username)
  tempStorage[discord_id] = verification_code
  return { discord: discord_id, message: message }
}

async function handleDiscourseCheck(
  discord_id,
  verification_code,
  discourse_username,
) {
  const response = await matchUser(
    discord_id,
    verification_code,
    discourse_username,
  )
  return response
}

// get user information from discourse api
async function getSpecificUser(discourse_username) {
  const getSpecificUser_URL = `https://forum.1hive.org/users/${discourse_username}.json`

  let userJson = await fetch(getSpecificUser_URL).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Couldn\'t fetch user info.')
    }
  })
  return userJson
}

// main logic to match user

async function matchUser(discord_id, verification_code, discourse_username) {
  let message, discourse_id
  console.log('temp', tempStorage[discord_id], 'verf', verification_code)
  if (verification_code !== tempStorage[discord_id]) {
    message = errorDiscourseVerificationEmbed(
      `You first need to submit this command:
      **!hny verify-discourse ${discourse_username}**
      `,
    )
  }
  const { user } = await getSpecificUser(discourse_username)

  if (user.name === verification_code) {
    discourse_id = user.id
    discourse_username = user.username
    message = successDiscourseVerificationEmbed(discourse_username)
  } else if (!message) {
    message = errorDiscourseVerificationEmbed(
      'We couldn\'t find the verification code in your discourse profile, could you double check your code has been saved in the \'Name\' field of your account?',
    )
  }

  if (
    discord_id &&
    verification_code &&
    verification_code === tempStorage[discord_id]
  ) {
    delete tempStorage[discord_id]
  }
  return { discord: discord_id, discourse: discourse_id, message: message }
}

// generate random code for user

function createVerificationCode() {
  let code = Math.random().toString(36).substr(2, 10)
  return code
}

let tempStorage = {}

module.exports = { handleDiscourseVerify, handleDiscourseCheck }
