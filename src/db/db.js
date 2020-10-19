const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const uri = process.env.MONGODB_URI
const mongoClient = new MongoClient(uri, {useUnifiedTopology: true})

// TODO: error handling
mongoClient.connect()


//TODO: fix logic to deal with null objects
async function insert(message, discourse_username, github_username, xdaiAddress) {
  try {
    const database = mongoClient.db(process.env.DB_NAME)
    const collection = database.collection(process.env.COLL_NAME)

    const walletDocument = {
      uid: message.author.id,
      name: message.author.tag,
      address: xdaiAddress,
    }
    const result = await collection.insertOne(walletDocument)
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    )
  } catch(e) {
    console.error('uh oh something went wrong! insert', e.message)
  }
}

async function handleData(message, discourse_username, github_username, address) {
  const dup = await checkDuplicate(message)
  if(dup) {
    await updateDuplicate(message, github_username, discourse_username, address)
    message.channel.send('User info updated')
  } else {
    await insert(message, github_username, discourse_username, address)
    message.channel.send('Data added to DB')
  }
}

async function checkDuplicate(message) {
  try {
    const database = mongoClient.db(process.env.DB_NAME)
    const collection = database.collection(process.env.COLL_NAME)
    const result = await collection.findOne({ uid: message.author.id })
    return result
  } catch(e) {
    console.error('uh oh something went wrong! checkDuplicate', e.message)
  }
}

async function updateDuplicate(message, xdaiAddress) {
  // TODO: fix logic to deal with null objects
  try {
    const database = mongoClient.db(process.env.DB_NAME)
    const collection = database.collection(process.env.COLL_NAME)

    const walletDocument = {
      $set: {
        uid: message.author.id,
        name: message.author.tag,
        address: xdaiAddress,
      },
    }

    const result = await collection.updateOne({ uid: message.author.id }, walletDocument)
    return result
  } catch(e) {
    console.error('uh oh something went wrong! updateDuplicate', e.message)
  }
}

module.exports = { insert, checkDuplicate, updateDuplicate, handleData }
