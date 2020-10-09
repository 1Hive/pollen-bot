const fetch = require('node-fetch')
const {
  verifyGithubEmbed,
  successGithubVerificationEmbed,
  errorGithubVerificationEmbed,
} = require('../embed')

async function handleGithubVerify(discord_id) {
  const verification_code = createVerificationCode()
  const message = verifyGithubEmbed(verification_code)
  tempStorage[discord_id] = verification_code
  return { discord: discord_id, message: message }
}

async function handleGithubCheck(
  discord_id,
  verification_code,
  github_username,
) {
  const response = await matchUser(
    discord_id,
    verification_code,
    github_username,
  )
  return response
}

// get user information from gist api
async function getUserGist(github_username) {
  const getSpecificUser_URL = `https://api.github.com/users/${github_username}/gists`

  const responseJson = await fetch(getSpecificUser_URL).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Couldn\'t fetch user info.')
    }
  })
  let gistPollen
  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].files['pollen.md']) {
      const gistJson = await fetch(responseJson[i].url).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Couldn\'t fetch pollen gist.')
        }
      })
      gistPollen = gistJson.files['pollen.md']
    }
  }

  return gistPollen
}

// main logic to match user

async function matchUser(discord_id, verification_code, github_username) {
  let message
  if (verification_code !== tempStorage[discord_id]) {
    message = errorGithubVerificationEmbed(
      `You first need to submit this command:
      **!hny verify-github ${github_username}**
      `,
    )
  }
  const { content } = await getUserGist(github_username)

  if (content === verification_code) {
    message = successGithubVerificationEmbed(github_username)
    delete tempStorage[discord_id]
  } else {
    message = errorGithubVerificationEmbed(
      'Your gist content doesn\'t match the verification code provided.',
    )
  }

  return { message: message }
}

// generate random code for user

function createVerificationCode() {
  let code = Math.random().toString(36).substr(2, 10)
  return code
}

let tempStorage = {}

module.exports = { handleGithubVerify, handleGithubCheck }
