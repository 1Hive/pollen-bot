import gql from "graphql-tag";
import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { honeyMetricsEmbed } from "../embed";
import { Message } from "discord.js";

const UNISWAP_URL = "https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2";

const HNY_FACTORY_QUERY = gql`
  query {
    uniswapDayDatas(orderBy: date, orderDirection: desc, first: 2) {
      dailyVolumeUSD
      totalLiquidityUSD
    }
  }
`;

export default async function honeyPrice(message: Message): Promise<void> {
  const graphqlClient = new ApolloClient({ 
    link: new HttpLink({ uri: UNISWAP_URL, fetch }),
    cache: new InMemoryCache()
  });
  const result = await graphqlClient.query({ query: HNY_FACTORY_QUERY });

  if (!result.data) return;

  const {
    totalLiquidityUSD,
    dailyVolumeUSD: todayVolumeRaw,
  } = result.data.uniswapDayDatas[0];
  const { dailyVolumeUSD: yesterdayVolumeRaw } = result.data.uniswapDayDatas[1];

  const [
    liquidity,
    todayVolume,
    yesterdayVolume,
    todayFees,
    yesterdayFees,
  ] = numberWithSpaces([
    totalLiquidityUSD,
    todayVolumeRaw,
    yesterdayVolumeRaw,
    todayVolumeRaw * 0.003,
    yesterdayVolumeRaw * 0.003,
  ]);

  message.channel.send(`<@${message.author.id}>`);
  message.channel.send(
    honeyMetricsEmbed(
      liquidity,
      yesterdayVolume,
      yesterdayFees,
      todayVolume,
      todayFees
    )
  );
}

const numberWithSpaces = (arr) =>
  arr.map((num) => {
    const parts = Math.round(num).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  });
