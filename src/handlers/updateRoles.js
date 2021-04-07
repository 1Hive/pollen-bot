const { sourcecred: sc } = require('sourcecred')
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
  // Roles 0.25x, 0.5x, 0.75x and 1x respectively
  const roles = ['774874504358133780', '771534378110287913', '774874617432244284', '771534371588276274']
  member.roles = member.roles.filter((role) => !roles.includes(role))
  if (totalCred >= 30 && totalCred < 60) {
    member.roles.push(roles[0])
  } else if (totalCred >= 60 && totalCred < 90) {
    member.roles.push(roles[1])
  } else if (totalCred >= 90 && totalCred < 120) {
    member.roles.push(roles[2])
  } else if (totalCred >= 120) {
    member.roles.push(roles[3])
  }
  return member
}

async function getMember(id) {
  console.log('fetching member')
  const res = await fetch(
    `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${id}`,
    {
      method: 'get',
      headers: {
        Authorization: 'Bot ' + process.env.DISCORD_API_TOKEN,
      },
    },
  )
  return res.json()
}

async function patchMember(member) {
  console.log('patching member')
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

async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

module.exports = async function updateroles(message, pollenData) {
  // Checks if called by the 12 hour interval or by the Pollen Admin
  if (
    (!message) ||
    (message.channel.type !== 'dm' &&
    message.author.id === process.env.POLLEN_ADMIN)
  ) {
    let count = 0
    let map = new Map()
    try {
      if (!pollenData) return message.reply('Still preloading pollen files, try again in a minute.')

      await message.channel.send('Updating pollen roles...')

      const { accounts, credParticipants } = pollenData

      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].identity.subtype !== 'USER') continue

        const discordAliases = accounts[i].identity.aliases.filter(alias => alias.address.includes('discord'))

        if (!discordAliases || discordAliases.length === 0) continue

        let discordId
        discordAliases.forEach((alias) => discordId = NodeAddress.toParts(alias.address)[4])
        const totalCred = credParticipants.find(p => p.id === accounts[i].identity.id).cred
        
        if (discordId && totalCred >= 30) map.set(discordId, totalCred)
      }

      for (const [key, value] of map.entries()) {
        let member = await getMember(key)
        console.log(member)
        if (member.code !== 10007) {
          member = await manageRoles(member, value)
          await patchMember(member)
          console.log(
            `User ${member.user.username} had their roles changed to: ${member.roles}`,
          )
          count++
          await patchMember(member)
        }
        await delay(5)
      }
      // If called by Pollen Admin on Discord...
      if (message) message.reply(`${count} users had their roles changed.`)
    } catch (err) {
      error(err)
      if (message) message.reply(`${err}`)
    }
  } else {
    message.reply('You do not have access to this command.')
  }
}
