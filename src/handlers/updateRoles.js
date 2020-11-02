const sc = require('sourcecred').default
const fetch = require('node-fetch')
const { error } = require('../utils')
const dotenv = require('dotenv')

dotenv.config()

const NodeAddress = sc.core.address.makeAddressModule({
  name: 'NodeAddress',
  nonce: 'N',
  otherNonces: new Map().set('E', 'EdgeAddress'),
})

function manageRoles(member, totalCred) {
  const roles = ['771534378110287913', '771534371588276274']
  member.roles = member.roles.filter((role) => !roles.includes(role))
  if(totalCred >= 40 && totalCred < 100) {
    member.roles.push(roles[0])
  } else if(totalCred >= 100) {
    member.roles.push(roles[1])
  }
  return member
}

async function getMember(id) {
  console.log('fetching member')
  const res = await(
    await fetch(`https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${id}`, {
      method: 'get',
      headers: {
        'Authorization': 'Bot ' + process.env.DISCORD_API_TOKEN,
      }
    }
    )).json()
  return res
}

async function patchMember(member) {
  console.log('patching member')
  const document = {
    roles: member.roles
  }
  const patchedMember = await fetch(`https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${member.user.id}`, {
    method: 'patch',
    body: JSON.stringify(document),
    headers: {
      'Authorization': 'Bot ' + process.env.DISCORD_API_TOKEN,
      'Content-Type': 'application/json'
    }
  })
  return patchedMember
}

async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

module.exports = async function updateroles(message) {
  if (
    message.channel.type !== 'dm' &&
    message.author.id === process.env.POLLEN_ADMIN
  ) {
    let count = 0
    let map = new Map()
    try {
      const credAccounts = await (
        await fetch(
          'https://raw.githubusercontent.com/1Hive/pollen/gh-pages/output/accounts.json',
        )
      ).json()
      const accounts = credAccounts.accounts

      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].account.identity.subtype !== 'USER') continue

        const discordAliases = accounts[i].account.identity.aliases.filter(
          (alias) => {
            const parts = NodeAddress.toParts(alias.address)
            return parts.indexOf('discord') > 0
          },
        )
        if (!discordAliases.length) continue

        let totalCred = 0
        let id

        discordAliases.forEach((alias) => {
          id = NodeAddress.toParts(alias.address)[4]
          totalCred = accounts[i].totalCred
        })

        if(id && totalCred >= 40) {
          map.set(id, totalCred)
        }
      }

      for (const [key, value] of map.entries()) {
        let member = await getMember(key)
        if(member.retry_after > 0) {
          console.log(member)
          await delay(member.retry_after)
          member = await getMember(key)
        }
        if((member.code !== 10007)) {
          member = await manageRoles(member, value)
          await patchMember(member)
          console.log(`User ${member.user.username} had their roles changed to: ${member.roles}`)
          count++
          await patchMember(member)
        }
      }
      message.reply(`${count} users had their roles changed.`)
    } catch (err) {
      error(err)
      message.reply(`${err}`)
    }
  } else {
    message.reply('You do not have access to this command')
  }
}
