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
  const roles = [
    '771534379696259133',
    '771534378110287913',
    '771534371588276274',
  ]
  member.roles = member.roles.filter((role) => !roles.includes(role))
  if (totalCred >= 40 && totalCred < 100) {
    member.roles.push(roles[1])
  } else if (totalCred >= 100) {
    member.roles.push(roles[2])
  }
  return member
}

function findMember(id, members) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].user.id === id) {
      return members[i]
    }
  }
  return null
}

async function patchMember(member) {
  const document = {
    roles: member.roles,
  }
  const patchedMember = await fetch(
    `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${member.user.id}`,
    {
      method: 'patch',
      body: JSON.stringify(document),
      headers: {
        Authorization: 'Bot ' + process.env.DISCORD_API_TOKEN,
        'Content-Type': 'application/json',
      },
    },
  )
  return patchedMember
}

async function getMembers() {
  const limit = 1000
  let doneLoading = false
  let allMembers = []
  let after = '0'
  while (!doneLoading) {
    const newMembers = await (
      await fetch(
        `https://discord.com/api/guilds/${process.env.GUILD_ID}/members?after=${after}&limit=${limit}`,
        {
          method: 'get',
          headers: {
            Authorization: 'Bot ' + process.env.DISCORD_API_TOKEN,
          },
        },
      )
    ).json()
    if (newMembers.length < limit) {
      doneLoading = true
    } else {
      after = newMembers[newMembers.length - 1].user.id
    }
    allMembers = allMembers.concat(newMembers)
  }
  return allMembers
}

module.exports = async function updateroles(message) {
  if (
    message.channel.type !== 'dm' &&
    message.author.id === process.env.POLLEN_ADMIN
  ) {
    let count = 0
    const members = await getMembers()
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

        let member = findMember(id, members)
        if (member) {
          member = manageRoles(member, totalCred)
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
