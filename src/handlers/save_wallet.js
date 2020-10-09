const Web3 = require('web3')
const { walletWarningEmbed } = require('../embed')
const dotenv = require('dotenv')
const db = require('../db/db')

dotenv.config()

var web3 = new Web3(process.env.WEB3_URL)

module.exports = async function save_wallet(message) {
  const rawAddress = message.content.split(' ')[2]
  if (typeof rawAddress !== 'undefined') {
    try {
      const xdaiAddress = web3.utils.toChecksumAddress(rawAddress)
      const dup = await db.checkDuplicate(message)
      console.log(dup)
      if(dup) {
        message.author.send('Your ID has already been found in the database, your address will be updated.')
        await db.updateDuplicate(message, xdaiAddress)
        message.author.send('updated')
      } else {
        await db.insert(message, xdaiAddress)
        message.author.send('Address added to DB')
      }
      return
    } catch(e) {
      console.error('invalid ethereum address', e.message)
    }
  }
  message.author.send(walletWarningEmbed())
}
