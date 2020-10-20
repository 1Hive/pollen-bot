const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  discordId: { type : String , unique : true, required : true, dropDups : true},
  address: {type:String},
  username: {type:String},
  github: {type:String},
  discourse: {type:String},
}, { versionKey: false })

module.exports = mongoose.model('User', UserSchema)
