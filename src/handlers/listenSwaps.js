const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const { newSwapEmbed } = require('../embed')

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'

const QUERY_SUBGRAPH = gql`
  query Swaps($pair: String!) {
    swaps(
      where: { pair: $pair }
      orderBy: timestamp
      orderDirection: desc
      first: 10
    ) {
      timestamp
      transaction {
        id
      }
      amount0In # honey in
      amount0Out # honey out
      amount1In # wxdai in
      amount1Out # wxdai out
      amountUSD
    }
  }
`

function lastTimestampTxs(transactions) {
  const lastTimestamp = transactions[0].timestamp
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].timestamp !== lastTimestamp) {
      // remove transaction that are not in the same timestamp as latest tx.
      transactions.splice(i, 1)
      // decrement i as the array was re-indexed.
      i -= 1
    }
  }
  return transactions
}

module.exports = async function listenSwaps(client) {
  // Create the GraphQL wrapper using the specific Subgraph URL
  const wrapper = new GraphQLWrapper(SUBGRAPH_URL)
  const pair = '0x4505b262dc053998c10685dc5f9098af8ae5c8ad'

  let memo = {
    timestamp: 0,
  }

  const subscription = await wrapper.subscribeToQuery(
    QUERY_SUBGRAPH,
    {
      pair,
    },
    (error, results) => {
      if (error) throw error

      // Handle each new result
      const { swaps } = results.data
      if (swaps[0].timestamp !== memo.timestamp) {
        const lastestSwaps = lastTimestampTxs(swaps)
        for (let i = 0; i < lastestSwaps.length; i++) {
          const hnyAmountIn = parseFloat(lastestSwaps[i].amount0In)
          const wxdaiAmountOut = parseFloat(lastestSwaps[i].amount1Out)
          const wxdaiAmountIn = parseFloat(lastestSwaps[i].amount1In)
          const hnyAmountOut = parseFloat(lastestSwaps[i].amount0Out)
          const amountUSD = parseFloat(lastestSwaps[i].amountUSD)
          const { id } = lastestSwaps[i].transaction

          if (hnyAmountIn !== 0 && wxdaiAmountOut !== 0) {
            // HNY for WXDAI
            client.channels.cache
              .get('762873501722869761')
              .send(
                newSwapEmbed(
                  'HNY',
                  hnyAmountIn.toFixed(4),
                  'WXDAI',
                  wxdaiAmountOut.toFixed(4),
                  amountUSD.toFixed(2),
                  id,
                ),
              )
          } else {
            // WXDAI for HNY
            client.channels.cache
              .get('762873501722869761')
              .send(
                newSwapEmbed(
                  'WXDAI',
                  wxdaiAmountIn.toFixed(4),
                  'HNY',
                  hnyAmountOut.toFixed(4),
                  amountUSD.toFixed(2),
                  id,
                ),
              )
          }
        }
        memo = swaps[0]
      }
    },
  )
  return subscription
}
