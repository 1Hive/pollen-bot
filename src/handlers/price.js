const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const { honeyPriceEmbed } = require('../embed')

const UNISWAP_URL = 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'
const XDAI_HNY_PAIR = '0x4505b262dc053998c10685dc5f9098af8ae5c8ad'

const graphqlClient = new GraphQLWrapper(UNISWAP_URL)

const HNY_PRICE_QUERY = gql`
  query {
    pair(id: "${XDAI_HNY_PAIR}") {
      token1Price
    }
  }
`

module.exports = async function honeyPrice(message) {
  const result = await graphqlClient.performQuery(HNY_PRICE_QUERY)

  if (!result.data) {
    return
  }

  const { pair } = result.data
  const hnyPrice = parseFloat(pair.token1Price).toFixed(2)
  message.channel.send(`<@${message.author.id}>`)
  message.channel.send(honeyPriceEmbed(hnyPrice))
}
