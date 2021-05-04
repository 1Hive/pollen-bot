import { Message } from "discord.js";
import gql from "graphql-tag";
import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

import { honeyPriceEmbed } from "../embed";
import { error } from "../utils";

const UNISWAP_URL = "https://api.thegraph.com/subgraphs/name/1hive/honeyswap-v2";
const XDAI_HNY_PAIR = "0x4505b262dc053998c10685dc5f9098af8ae5c8ad";

const HNY_PRICE_QUERY = gql`
  query {
    pair(id: "${XDAI_HNY_PAIR}") {
      token1Price
    }
  }
`;

const graphqlClient = new ApolloClient({ 
  link: new HttpLink({ uri: UNISWAP_URL, fetch }),
  cache: new InMemoryCache()
});

export default async function honeyPrice(message: Message): Promise<void> {
  try {
    const result = await graphqlClient.query({ query: HNY_PRICE_QUERY });
  
    if (!result.data || !result.data.pair) return;
  
    const { pair } = result.data;
    const hnyPrice = +parseFloat(pair.token1Price).toFixed(2);
    
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send(honeyPriceEmbed(hnyPrice));
  } catch (err) {
    error(err);
  }
}
