import gql from "graphql-tag";
import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { Message } from "discord.js";

const HONEY_MAKER_ADDRESS = "0x076b64f9f966e3bbd0fcdc79d490ab71cf961bb0";
const ISSUER_ADDRESS = "0xB9FB2aD5820cCD9Fd7BD6a9E35f98B22914DB58A";
const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/crisog/honey-common-pool";

const unixTimeDay = 86400;

// This is the timestamp from 24 hours ago.
const timestamp = Math.round(new Date().getTime() / 1000) - unixTimeDay;

const QUERY_24HR_TRANSFERS = gql`
  query TransfersData($timestamp: BigInt!) {
    transfers(where: { timestamp_gte: $timestamp }) {
      amount
      token
    }
  }
`;

const QUERY_24HR_DEPOSITS_ADDRESS = gql`
  query DepositsData($timestamp: BigInt!, $address: String!) {
    deposits(where: { timestamp_gte: $timestamp, id: $address }) {
      amount
      token
    }
  }
`;

export default async function getHoneyFlow(message: Message): Promise<void> {
  // Create the GraphQL wrapper using the specific Subgraph URL
  const wrapper = new ApolloClient({ 
    link: new HttpLink({ uri: SUBGRAPH_URL, fetch }),
    cache: new InMemoryCache() 
  });

  // Inbound queries
  const { data: honeyMakerData } = await wrapper.query({
    query: QUERY_24HR_DEPOSITS_ADDRESS,
    variables: {
      timestamp,
      address: HONEY_MAKER_ADDRESS,
    }
  });

  let totalHoneyMakerInbound = 0;

  if (honeyMakerData !== undefined) {
    honeyMakerData.forEach(({ amount }) => (totalHoneyMakerInbound += amount));
  }

  const { data: issuanceData } = await wrapper.query({
    query: QUERY_24HR_DEPOSITS_ADDRESS,
    variables: {
      timestamp,
      address: ISSUER_ADDRESS,
    }
  });

  let totalIssuanceInbound = 0;

  if (issuanceData !== undefined) {
    issuanceData.forEach(({ amount }) => (totalIssuanceInbound += amount));
  }

  const totalInbound = totalIssuanceInbound + totalHoneyMakerInbound;

  let honeyMakerPercentage = 0;
  if (totalHoneyMakerInbound !== 0) {
    honeyMakerPercentage = (totalHoneyMakerInbound / totalInbound) * 100;
  }

  let issuancePercentage = 0;
  if (totalIssuanceInbound !== 0) {
    issuancePercentage = (totalIssuanceInbound / totalInbound) * 100;
  }

  // Outbound queries
  const { data: outboundData } = await wrapper.query({
    query: QUERY_24HR_TRANSFERS,
    variables: {
      timestamp,
    }
  });

  let totalOutbound = 0;

  if (outboundData !== undefined) {
    outboundData.forEach(({ amount }) => (totalOutbound += amount));
  }

  message.channel.send({
    embed: {
      title: ":honey_pot: Honey Flow (inbound, 24hrs)",
      color: 3320370,
      fields: [
        {
          name: "Total Inflow",
          value: `${totalInbound} HNY`,
        },
        {
          name: "Honeymaker",
          value: `${totalHoneyMakerInbound} HNY (${honeyMakerPercentage}%)`,
        },
        {
          name: "Issuance",
          value: `${totalIssuanceInbound} HNY (${issuancePercentage}%)`,
        },
      ],
    },
  });

  message.channel.send({
    embed: {
      title: ":honey_pot: Honey Flow (outbound, 24hrs)",
      color: 13571606,
      fields: [
        {
          name: "Outflow",
          value: `${totalOutbound} HNY`,
        },
      ],
    },
  });
}
