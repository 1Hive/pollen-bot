const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const { honeyMetricsEmbed } = require('../embed')

const UNISWAP_URL = 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'
const HONEYSWAP_FACTORY_ID = '0xa818b4f111ccac7aa31d0bcc0806d64f2e0737d7'

let HNY_FACTORY_QUERY = gql`
  query {
    uniswapFactory(id: "${HONEYSWAP_FACTORY_ID}") {
      totalVolumeUSD
      totalLiquidityUSD
      txCount
    }
  }
`

module.exports = async function honeyPrice(message) {
  let graphqlClient = new GraphQLWrapper(UNISWAP_URL)
  let result = await graphqlClient.performQuery(HNY_FACTORY_QUERY)

  if (!result.data) {
    return
  }

  let { uniswapFactory } = result.data
  let honeyFactoryLiquidity = numberWithSpaces(Math.round(uniswapFactory.totalLiquidityUSD))
  let honeyFactoryVolume = numberWithSpaces(Math.round(uniswapFactory.totalVolumeUSD))
  let honeyFactoryFees = numberWithSpaces(Math.round(uniswapFactory.totalVolumeUSD * 0.0003))

  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(honeyMetricsEmbed(honeyFactoryLiquidity, honeyFactoryVolume, honeyFactoryFees))
}

function numberWithSpaces(x) {
  var parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
}
