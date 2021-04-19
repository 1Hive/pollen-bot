/* eslint-disable quotes */
export function welcomeEmbed(): unknown {
  return {
    embed: {
      title: "Welcome to 1Hive! 🍯",
      description:
        "Please say hi in the [#:coffee:cafe](https://discord.com/channels/698287700834517064/708187392594411521) to share how you found us and what interests you!\nYou could also head over to the [Introduce yourself to 1Hive thread](https://forum.1hive.org/t/introduce-yourself-to-1hive-thread/130)!",
      color: 16769024,
      fields: [
        {
          name: "Bot Commands :bee:",
          value: "Need help? Try `!hny help`",
        },
        {
          name: "1Hive Wiki with up to date info 📝",
          value: "https://1hive.gitbook.io/1hive/",
        },
        {
          name: "Frequently Asked Questions (FAQ) ❓",
          value: "https://1hive.gitbook.io/1hive/guides/faq",
        },
        {
          name: "Get free honey 🤑",
          value: "https://faucet.1hive.org/",
        },
        {
          name: "Share your thoughts on our forum! 💭",
          value: "https://forum.1hive.org/",
        },
        {
          name: "Learn more about Honey (HNY) 🍯",
          value: "https://1hive.gitbook.io/1hive/projects/honey",
        },
        {
          name: "Milestones and weekly updates of all the things 📰",
          value: "https://1hive.gitbook.io/1hive/projects/milestones ",
        },
        {
          name: "Detailed description of all of our Discord ℹ️",
          value: "https://1hive.gitbook.io/1hive/getting-started/discord",
        },
        {
          name: "Our community covenant",
          value: "https://1hive.gitbook.io/1hive/community-covenant",
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function brightidWarningEmbed(): unknown {
  return {
    embed: {
      title: "Warning 🚨",
      description:
        "You should not send BrightID connection links on public channels!",
      color: 16769024,
      fields: [
        {
          name: "Want to get verified?",
          value:
            "The best way is to join a verification party at https://www.brightid.org/meet.",
        },
        {
          name: "Need more information?",
          value: "Give the command `!hny brightid` a try!",
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function wrongChannelWarningEmbed(): unknown {
  return {
    embed: {
      title: "Warning 🚨",
      description:
        "Bot commands are only allowed in <#762377613062701146> channel!",
      color: 16769024,
      fields: [
        {
          name: "Lets keep our discord server clean :)",
          value:
            "We encourage bees to use channels properly, if you ever feel lost check [this at #info](https://discordapp.com/channels/698287700834517064/758821739202347038/758886904078008363).",
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function walletWarningEmbed(): unknown {
  return {
    embed: {
      title: "Warning 🚨",
      description: "You are using the `!hny wallet` command incorrectly!",
      color: 16769024,
      fields: [
        {
          name: "`!hny wallet <address>`",
          value:
            "Correct usage of this command requires you to add your xdai wallet address. An example of how to properly use the command is included below!",
        },
      ],
      image: {
        url: "https://i.imgur.com/E7x8s0j.png",
      },
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function brightidEmbed(): unknown {
  return {
    embed: {
      title: "How to get verified with Bright ID",
      url: "https://www.brightid.org/",
      color: 16769024,
      author: {
        name: "Assistant Bee",
        url: "https://github.com/crisog/assistant-bee",
      },
      description:
        "Here is a step-by-step guide to help you get verified with BrightID.",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      fields: [
        {
          name: "1. Get Verified in the BrightID app",
          value:
            'Getting verified requires you make connections with other trusted users. Given the concept is new and there are not many trusted users, this is currently being done through [Verification parties](https://www.brightid.org/meet "https://www.brightid.org/meet") that are hosted in the BrightID server and require members join a voice/video call.',
        },
        {
          name: "2. Link to a Sponsored App (like 1hive, gitcoin, etc)",
          value:
            "You can link to these [sponsored apps](https://apps.brightid.org/) once you are verified within the app.",
        },
        {
          name: "3. Type the `!verify` command in the designated channel",
          value:
            "In the 1hive server you can type this command in <#762377613062701146>, or you can do this in any public channel in the BrightID discord which [you can access here](https://discord.gg/gH6qAUH).",
        },
        {
          name: "4. Scan the DM'd QR Code",
          value:
            "Open the BrightID app and scan the QR code. Mobile users can click the link that comes with it.",
        },
        {
          name: "5. Type the `!me` command in the designated channel",
          value:
            "Once you have scanned the QR code you can return to the designated channels and type the `!me` command which should grant you the Bee :bee: role",
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "Embed with thanks to our friends over at https://she.energy/",
      },
    },
  };
}

export function helpEmbed(): unknown {
  return {
    embed: {
      color: 16769024,
      author: {
        name: "Assistant Bee",
        url: "https://github.com/crisog/assistant-bee",
      },
      description:
        "Hi, my name's Assistant Bee, I'm 1hive's helper. All my commands are prefixed by `!hny`. Refer to the list below for my full export functionality!",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      fields: [
        {
          name: "Wiki",
          value:
            "The [1Hive Wiki](https://1hive.gitbook.io/1hive/) contains up to date info about 1Hive, including [FAQ's](https://1hive.gitbook.io/1hive/guides/faq).",
        },
        {
          name: "!hny address",
          value: "Displays HNY's contract address",
        },
        {
          name: "!hny pollen",
          value:
            "[Pollen](https://1hive.gitbook.io/1hive/getting-started/pollen) is a contributor rank used to recognize contributions to the Hive. Refer to the command for more information.",
        },
        {
          name: "!hny save-wallet <address>",
          value:
            "This command saves your wallet to a database to be used for pollen payouts.",
        },
        {
          name: "!hny brightid",
          value:
            "Step-by-step guide on how to get verified with [BrightID](https://www.brightid.org)",
        },
        {
          name: "!hny mycred",
          value: "Shows your total cred and cred earned the past week.",
        },
        {
          name: "!hny price",
          value: "Show the current price of HNY.",
        },
        {
          name: "!hny metrics",
          value:
            "Shows metrics of honeyswap.org (Liquidity, total volume & total fees).",
        },
        {
          name: "!hny official",
          value: "Shows every official accounts for honey.",
        },
        {
          name: "!hny network",
          value: "Shows the info about the xDai network.",
        },
      ],
      image: {
        url: "https://i.imgur.com/E7x8s0j.png",
      },
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function helpEmbedES(): unknown {
  return {
    embed: {
      color: 16769024,
      author: {
        name: "Assistant Bee",
        url: "https://github.com/crisog/assistant-bee",
      },
      description:
        "Hola, me llamo abeja asistente, Soy la ayudante de 1hive's. Todos mis comandos empiezan por `!hny`. En la siguiente lista podrás ver todas mis funcionalidades!",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      fields: [
        {
          name: "FAQ",
          value:
            "Para información completa sobre 1hive, HNY y la verificación de brightID, por favor revisa este link [FAQ](https://forum.1hive.org/t/todo-sobre-1hive-en-un-solo-lugar-nuevo-faq-en-desarrolo/272).",
        },
        {
          name: "!hny address",
          value: "Esto muestra la dirección de contrado de HNY",
        },
        {
          name: "!hny pollen",
          value:
            "[Pollen](https://1hive.gitbook.io/1hive/v/espanol/getting-started-1/pollen) es un rango de colaborador que se usa para reconocer las contribuciones a la colmena (Hive). Consulta el comando para obtener más información.",
        },
        {
          name: "!hny brightid",
          value:
            "Guía paso por paso de como verificarte con brightID [BrightID](https://www.brightid.org)",
        },
        {
          name: "!hny mycred",
          value:
            "Te muestra el cred total y el cred de la semana pasada que llevas acumulado.",
        },
        {
          name: "!hny price",
          value: "Muestra el precio actual de HNY.",
        },
        {
          name: "!hny metrics",
          value:
            "Muestra las métricas de honeyswap.org (Liquidez, volumen total y comisiones totales).",
        },
        {
          name: "!hny official",
          value: "Muestra todas las cuentas oficiales de Honey.",
        },
        {
          name: "!hny network",
          value: "Muestra la información de la red xDai.",
        },
      ],
      image: {
        url: "https://i.imgur.com/E7x8s0j.png",
      },
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function pollenEmbed(): unknown {
  return {
    embed: {
      color: 16769024,
      author: {
        name: "Assistant Bee",
        url: "https://github.com/crisog/assistant-bee",
      },
      description:
        "[Pollen](https://1hive.gitbook.io/1hive/getting-started/pollen) is a contributor rank used to recognize contributions to 1hive’s discord, discourse, and github communities. These contributions are rewarded with weekly distributions of Honey.",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      fields: [
        {
          name: "Signing up",
          value:
            "To sign up for Pollen, post in the <#708187332154753065> channel with your relevant IDs and a tag to the <#749003215940485180> channel. An example post is included in the image below.",
        },
        {
          name: "Future of Pollen",
          value:
            "Onboarding is currently done manually, in the future we will attempt to automate this process.",
        },
      ],
      image: {
        url: "https://i.imgur.com/2OFG47E.png",
      },
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function verifyDiscourseEmbed(
  verificationCode: string,
  discourseUsername: string
): unknown {
  return {
    embed: {
      title: "Verify discourse account",
      description:
        "Process to verify your account to opt-in for pollen distributions.",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "1. Change your discourse name",
          value: `Go to your [account preferences](https://forum.1hive.org/u/${discourseUsername}/preferences/account) and after that,
          change your 'Name' field temporarily into this: **${verificationCode}**.`,
        },
        {
          name: "2. Complete the verification",
          value: `Confirm the previous step using the following command:
          **!hny check-discourse ${verificationCode} ${discourseUsername}**`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function successDiscourseVerificationEmbed(
  discourseUsername: string
): unknown {
  return {
    embed: {
      title: "Congratulations!",
      description: "The verification process was completed successfully",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "All set!",
          value: `Thanks for verifying your discourse account for pollen distributions, ${discourseUsername}!`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function errorDiscourseVerificationEmbed(errorMessage: string): unknown {
  return {
    embed: {
      title: "Bad news!",
      description: "There was an error in the discourse verification process.",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "This is what happened",
          value: `${errorMessage}`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function verifyGithubEmbed(
  verificationCode: string,
  githubUsername: string
): unknown {
  return {
    embed: {
      title: "Verify github account",
      description:
        "Process to verify your account to opt-in for pollen distributions.",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "1. Create a public gist",
          value: "Create a public gist called `pollen.md`",
        },
        {
          name: `2. Set code ${verificationCode}`,
          value: "Place the code in the body of the gist",
        },
        {
          name: "3. Complete the verification",
          value: `Confirm the previous step using the following command:
          **!hny check-github ${verificationCode} ${githubUsername}**`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function successGithubVerificationEmbed(
  githubUsername: string
): unknown {
  return {
    embed: {
      title: "Congratulations!",
      description: "The verification process was completed successfully",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "All set!",
          value: `Thanks for verifying your github account for pollen distributions, ${githubUsername}!`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function errorGithubVerificationEmbed(errorMessage: string): unknown {
  return {
    embed: {
      title: "Bad news!",
      description: "There was an error in the github verification process.",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "This is what happened",
          value: `${errorMessage}`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function honeyAddy(): unknown {
  return {
    embed: {
      title: "$HNY Token 🍯",
      color: 16769024,
      fields: [
        {
          name: "Address",
          value: "0x71850b7e9ee3f13ab46d67167341e4bdc905eef9",
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "1hive.gitbook.io",
      },
    },
  };
}

export function honeyPriceEmbed(honeyPrice: number): unknown {
  return {
    embed: {
      title: "$HNY",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "Price 💰",
          value: `$${honeyPrice}`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "info.honeyswap.org",
      },
    },
  };
}

export function honeyMetricsEmbed(
  liquidity: number,
  yesterdayVolume: number,
  yesterdayFees: number,
  todayVolume: number,
  todayFees: number
): unknown {
  return {
    embed: {
      title: "Metrics",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      color: 16769024,
      fields: [
        {
          name: "Total Liquidity 💰",
          value: `$${liquidity}`,
        },
        {
          name: "Total Volume - Yesterday",
          value: `$${yesterdayVolume}`,
        },
        {
          name: "Total Fees - Yesterday",
          value: `$${yesterdayFees}`,
        },
        {
          name: "Total Volume - Today",
          value: `$${todayVolume}`,
        },
        {
          name: "Total Fees - Today",
          value: `$${todayFees}`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "info.honeyswap.org",
      },
    },
  };
}

export function xDaiInfoEmbed(): unknown {
  return {
    embed: {
      title: "xDai network",
      thumbnail: {
        url: "https://miro.medium.com/max/400/1*evbI9uxxj2OkBaWNpWcssw.png",
      },
      color: 16769024,
      fields: [
        {
          name: "Network Name:",
          value: `xDai`,
        },
        {
          name: "New RPC URL:",
          value: `https://rpc.xdaichain.com/`,
        },
        {
          name: "ChainID:",
          value: `100`,
        },
        {
          name: "Symbol:",
          value: `xDai`,
        },
        {
          name: "Block Explorer URL:",
          value: `https://blockscout.com/poa/xdai`,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "info.honeyswap.org",
      },
    },
  };
}

export function officialAccountsEmbed(): unknown {
  return {
    embed: {
      title: "Official accounts",
      thumbnail: {
        url:
          "https://audiologydesign.com/wp-content/uploads/2017/05/header-social.jpg",
      },
      color: 16769024,
      description: [
        "- [Instagram - 1Hive](https://www.instagram.com/honeyswap.1hive/)\n",
        "- [Instagram - 1Hive in Spanish](https://www.instagram.com/honeyswap.1hive_es/)\n",
        "- [Instagram - Honeyswap](https://www.instagram.com/honeyswap/)\n",
        "- [Twitter - 1Hive](https://twitter.com/1HiveOrg)\n",
        "- [Twitter - Honeyswap](https://twitter.com/Honeyswap)\n",
        "- [Twitter - Honeyswap in Chinese](https://twitter.com/HoneySwap_CN)\n",
        "- [Twitter - Honeyswap in Spanish](https://twitter.com/HoneyswapEs)\n",
        "- [Twitter - Honeyswap in Hindi](https://twitter.com/honeyswap_IN)\n",
        "- [Reddit](https://www.reddit.com/r/HNY/)\n",
        "- [Facebook](https://www.facebook.com/honeyswapdex/)\n",
        "- [Telegram](https://t.me/honeyswapDEX)\n",
        "- [YouTube](https://www.youtube.com/channel/UCg0yASRY6TmXDryitYvsJOQ)\n",
        "- [Medium - 1Hive](https://medium.com/1hive)\n",
        "- [Medium - Honeyswap](https://medium.com/honeyswap)\n",
        "- [Blog](https://about.1hive.org/blog/)\n",
        "- [Wechat](https://bit.ly/38UuWeJ)\n",
        "- Kuaishou: honeyswap\n",
      ].join(""),
      timestamp: new Date(),
      footer: {
        text: "info.honeyswap.org",
      },
    },
  };
}

export function credEmbed(
  totalCred: number,
  lastWeekCred: number,
  thisWeekCred: number
): unknown {
  return {
    embed: {
      color: 16769024,
      title: "Your cred:",
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      fields: [
        {
          name: "Total",
          value: Math.round(totalCred),
        },
        {
          name: "Last week",
          value: Math.round(lastWeekCred),
        },
        {
          name: "This week",
          value: Math.round(thisWeekCred),
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "pollen.1hive.org",
      },
    },
  };
}

export function sitesEmbed(siteData: string): unknown {
  return {
    embed: {
      title: "1Hive sites and links",
      url: "https://wiki.1hive.org/",
      color: 16769024,
      author: {
        name: "Assistant Bee",
        url: "https://github.com/crisog/assistant-bee",
      },
      description: `Following is a list of all 1Hive sites and resources:\n${siteData}`,
      thumbnail: {
        url: "https://i.imgur.com/dRxtULu.png",
      },
      timestamp: new Date(),
    },
  };
}
