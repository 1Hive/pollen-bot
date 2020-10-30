const sc = require('sourcecred').default
const fetch = require('node-fetch')
const { error } = require('../utils')

const NodeAddress = sc.core.address.makeAddressModule({
  name: 'NodeAddress',
  nonce: 'N',
  otherNonces: new Map().set('E', 'EdgeAddress'),
})

module.exports = async function updateroles(message) {
  if(message.author.id === '137320343932108800') {
    try {
      const credAccounts = await(
        await fetch('https://raw.githubusercontent.com/1Hive/pollen/gh-pages/output/accounts.json')
      ).json()
      const accounts = credAccounts.accounts

      const members = await message.guild.members.fetch()
      console.log(members.size)

      for(var i = 0; i < accounts.length; i++) {
        if(accounts[i].account.identity.subtype !== 'USER') continue

        const discordAliases = accounts[i].account.identity.aliases.filter(
          alias => {
            const parts = NodeAddress.toParts(alias.address)
            return parts.indexOf('discord') > 0
          },
        )
        if(!discordAliases.length) continue

        //let totalCred = 0
        let id
        let member

        discordAliases.forEach(alias => {
          id = NodeAddress.toParts(alias.address)[4]
        })

        member = members.get(id)
        if(member) {
          const roleAdded = await member.roles.add(['771499754970415105'])
          console.log(roleAdded)
        }
      }

    } catch(err) {
      error(err)
      message.reply(`${err}`)
    }
  } else {
    message.reply(`<@${message.author.id}> you do not have access to this command`)
  }
}
