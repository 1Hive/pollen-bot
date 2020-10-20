const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const uri = process.env.MONGODB_URI
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.connect(uri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('we are connected!')
})
