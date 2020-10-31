const sc = require('sourcecred').default
const fetch = require('node-fetch')
const { error } = require('../utils')

const NodeAddress = sc.core.address.makeAddressModule({
  name: 'NodeAddress',
  nonce: 'N',
  otherNonces: new Map().set('E', 'EdgeAddress'),
})

async function manageRoles(member, totalCred) {
  const roles = ['771534379696259133', '771534378110287913', '771534371588276274']
  for(let i = 0; i < member.roles.cache.size; i++) {
    if(member.roles.cache.has(roles[i])) {
      member.roles.remove(roles[i])
    }
  }
  if(totalCred < 40) {
    await member.roles.add(roles[0])
  } else if(totalCred >= 40 && totalCred < 100) {
    await member.roles.add(roles[1])
  } else if(totalCred >= 100) {
    await member.roles.add(roles[2])
  }
}

module.exports = async function updateroles(message) {
  if(message.author.id === '579830927287386126') {
    try {
      const credAccounts = await(
        await fetch('https://raw.githubusercontent.com/1Hive/pollen/gh-pages/output/accounts.json')
      ).json()
      const accounts = credAccounts.accounts

      const members = await message.guild.members.fetch()

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
        let id
        let member

        discordAliases.forEach(alias => {
          id = NodeAddress.toParts(alias.address)[4]
          totalCred = accounts[i].totalCred
        })

        member = members.get(id)
        if(member) {
          await manageRoles(member, totalCred)
        }
      }
    } catch(err) {
      error(err)
      message.reply(`${err}`)
    }
  } else {
    message.reply('You do not have access to this command')
  }
}
