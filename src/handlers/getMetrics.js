const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const { honeyMetricsEmbed } = require('../embed')

const UNISWAP_URL = 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'

const HNY_FACTORY_QUERY = gql`
  query {
    uniswapDayDatas(orderBy: date, orderDirection: desc, first: 2) {
      dailyVolumeUSD
      totalLiquidityUSD
    }
  }
`

module.exports = async function honeyPrice(message) {
  const graphqlClient = new GraphQLWrapper(UNISWAP_URL)
  const result = await graphqlClient.performQuery(HNY_FACTORY_QUERY)

  if (!result.data) return

  const { totalLiquidityUSD, dailyVolumeUSD: todayVolumeRaw } = result.data.uniswapDayDatas[0]
  const { dailyVolumeUSD: yesterdayVolumeRaw } = result.data.uniswapDayDatas[1]

  const [ liquidity, todayVolume, yesterdayVolume, todayFees, yesterdayFees ] = numberWithSpaces([
    totalLiquidityUSD,
    todayVolumeRaw,
    yesterdayVolumeRaw,
    todayVolumeRaw * 0.003,
    yesterdayVolumeRaw * 0.003
  ])

  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(honeyMetricsEmbed(
    liquidity,
    yesterdayVolume,
    yesterdayFees,
    todayVolume,
    todayFees
  ))
}

const numberWithSpaces = arr => arr.map(num => {
  const parts = Math.round(num).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
})
