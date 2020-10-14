const sc = require('sourcecred').default
const fetch = require('node-fetch')

const { credEmbed } = require('../embed')

const NodeAddress = sc.core.address.makeAddressModule({
  name: 'NodeAddress',
  nonce: 'N',
  otherNonces: new Map().set('E', 'EdgeAddress'),
})

module.exports = async function mycred(message) {
  const credAccounts = await(
    await fetch('https://raw.githubusercontent.com/1Hive/pollen/gh-pages/output/accounts.json')
  ).json()

  try {
    const accounts = credAccounts.accounts
    for(var i = 0; i < accounts.length; i++) {
      if(accounts[i].account.identity.subtype !== 'USER') continue

      const discordAliases = accounts[i].account.identity.aliases.filter(
        alias => {
          const parts = NodeAddress.toParts(alias.address)
          return parts.indexOf('discord') > 0
        },
      )
      if(!discordAliases.length) continue

      let totalCred = 0
      let length = 0
      let cred = 0

      discordAliases.forEach(alias => {
        const id = NodeAddress.toParts(alias.address)[4]
        if(id === message.author.id) {
          totalCred = accounts[i].totalCred
          length = accounts[i].cred.length
          cred = accounts[i].cred
        }
      })
      if (totalCred === 0) continue

      message.channel.send(`<@${message.author.id}>`)
      message.channel.send(credEmbed(totalCred, length, cred))
    }
  } catch (err) {
    console.log('error:', err)
    return message.reply('Alas, we cannot find you!')
  }
}
