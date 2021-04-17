const mongoose = require('mongoose')

const BannedUserSchema = new mongoose.Schema({
  discordId: { type: String , unique: true, required: true },
  username: { type: String , unique: true, required: true },
})

module.exports = mongoose.model('BannedUser', BannedUserSchema)
