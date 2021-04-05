const { loadLedger, loadCredGraph } = require('../utils')

const { credEmbed } = require('../embed')

module.exports = async function mycred(message) {
  message.reply('Fetching cred...')

  const ledger = await loadLedger()
  const credGraph = await loadCredGraph()
  const accounts = ledger.accounts()

  const accountFound = accounts
    .find(account => account.identity.aliases.some(alias => alias.address.includes(message.author.id)))
  
  if(!accountFound) return message.reply('Alas, we cannot find you, try again tomorrow!')

  const credParticipant = Array.from(credGraph.participants())
    .find(p => p.id === accountFound.identity.id)
  const credHistory = credParticipant.credPerInterval

  message.channel.send(credEmbed(
    credParticipant.cred,
    credHistory[credHistory.length -2],
    credHistory[credHistory.length - 1]
  ))
}
