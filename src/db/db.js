const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const uri = process.env.MONGODB_URI
const mongoClient = new MongoClient(uri, {useUnifiedTopology: true})

// TODO: error handling
mongoClient.connect()

async function insert(message, xdaiAddress) {
  try {
    const database = mongoClient.db(process.env.DB_NAME)
    const collection = database.collection(process.env.COLL_NAME)

    const walletDocument = {
      uid: message.author.id,
      name: message.author.tag,
      address: xdaiAddress,
    }
    // TODO: prevent duplicate discord ID
    const result = await collection.insertOne(walletDocument)
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    )
  } catch(e) {
    console.error('uh oh something went wrong!', e.message)
  }
}

module.exports = { insert }
