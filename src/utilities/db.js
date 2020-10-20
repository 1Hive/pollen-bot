const mongoose = require('mongoose')
const model = 'User'

async function dbHandler(message, discourse_username, github_username, address) {
  const searchParameter = { discordId: message.author.id }

  let document = {
    discordId: message.author.id,
    username: message.author.tag,
  }

  if(discourse_username) {
    document.discourse = discourse_username
  } else if(github_username) {
    document.github = github_username
  } else if(address) {
    document.address = address
  }

  const modelFound = await mongoose.model(model)
  let resultPromise = await modelFound.findOne( searchParameter, (erro) => {
    if (erro) {
      console.log(erro)
    }
  })
  resultPromise = await createOrUpdate(searchParameter, resultPromise, document, modelFound)
  return resultPromise
}

async function createOrUpdate(searchParameter, resultPromise, document, modelFound) {
  if (resultPromise === null){
    resultPromise = await modelFound.create(document)
  } else {
    resultPromise = await modelFound.updateOne(searchParameter, document)
  }
  return resultPromise
}

module.exports = { dbHandler }
