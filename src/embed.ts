/* eslint-disable quotes */
import { MessageEmbed } from "discord.js";

export function wrongChannelWarningEmbed(): MessageEmbed {
  return new MessageEmbed({
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
      text: "wiki.1hive.org",
    },
  })
}

export function walletWarningEmbed(): MessageEmbed {
  return new MessageEmbed({
    title: "Warning 🚨",
    description: "You are using the `!pollen save-wallet` command incorrectly!",
    color: 16769024,
    fields: [
      {
        name: "`!pollen save-wallet <address>`",
        value:
          "Correct usage of this command requires you to add your xDai wallet address.",
      },
    ],
    image: {
      url: "https://i.imgur.com/E7x8s0j.png",
    },
    timestamp: new Date(),
    footer: {
      text: "wiki.1hive.org",
    },
  })
}

export function infoEmbed(): MessageEmbed {
  return new MessageEmbed({
    color: 16769024,
    author: {
      name: "Pollen bot",
      url: "https://github.com/1Hive/pollen-bot",
    },
    description:
      "[Pollen](https://wiki.1hive.org/getting-started/pollen) is a contributor rank used to recognize contributions to 1Hive's Discord, Discourse, and GitHub communities. These contributions are rewarded with weekly distributions of Honey.",
    thumbnail: {
      url: "https://i.imgur.com/dRxtULu.png",
    },
    fields: [
      {
        name: "Signing up",
        value:
          "To sign up for Pollen, you need to send your information to the DB using some of the following commands.",
      },
      {
        name: "Save Discord account",
        value:
          "Send `!pollen save-discord` to add your Discord ID and tag to the Pollen DB.",
      },
      {
        name: "Save Discourse (Forum) account - optional",
        value:
          "Send `!pollen verify-discourse <discourse-username>` and follow the process to verify and add your Discourse username to the Pollen DB.",
      },
      {
        name: "Save GitHub account - optional",
        value:
          "Send `!pollen verify-github <github-username>` and follow the process to verify and add your GitHub username to the Pollen DB.",
      },
      {
        name: "Save wallet address - optional",
        value:
          "Send `!pollen save-wallet <wallet-address>` to add your wallet address to the Pollen DB (Although this step is optional, you won't be able to receive HNY until you save a valid address).",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "wiki.1hive.org",
    }
  })
}

export function helpEmbed(): MessageEmbed {
  return new MessageEmbed({
    color: 16769024,
    author: {
      name: "Pollen bot",
      url: "https://github.com/1Hive/pollen-bot",
    },
    description:
      "Hi, my name's Pollen Bot, I handle some Pollen related actions. All my commands are prefixed by `!pollen`. Refer to the list below for a list of my commands!",
    thumbnail: {
      url: "https://i.imgur.com/dRxtULu.png",
    },
    fields: [
      {
        name: "!pollen help",
        value: "Lists all pollen commands."
      },
      {
        name: "!pollen info",
        value: "Displays information of what Pollen is and how to get started.",
      },
      {
        name: "!pollen mycred",
        value:
          "Shows your total cred, cred earned last week and cred earned this week.",
      },
      {
        name: "!pollen userinfo",
        value: "Shows your pollen user info saved in the database."
      },
      {
        name: "!pollen save-discord",
        value: "Saves your Discord ID and tag in the database."
      },
      {
        name: "!pollen verify-discourse <discourse-username>",
        value:
          "Begins the process of verifying and saving your Discourse username in the database.",
      },
      {
        name: "!pollen verify-github <github-username>",
        value:
          "Begins the process of verifying and saving your GitHub username in the database.",
      },
      {
        name: "!pollen save-wallet <address>",
        value: "Saves your wallet address in the database to be used for pollen payouts.",
      }
    ],
    image: {
      url: "https://i.imgur.com/E7x8s0j.png",
    },
    timestamp: new Date(),
    footer: {
      text: "wiki.1hive.org",
    }
  })
}

export function verifyDiscourseEmbed(
  verificationCode: string,
  discourseUsername: string
): MessageEmbed {
  return new MessageEmbed({
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
        change your 'Name' field temporarily into this: \`${verificationCode}\`.`,
      },
      {
        name: "2. Complete the verification",
        value: `Confirm the previous step using the following command:
        \`!pollen check-discourse ${verificationCode} ${discourseUsername}\``,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "wiki.1hive.org",
    }
  })
}

export function successDiscourseVerificationEmbed(
  discourseUsername: string
): MessageEmbed {
  return new MessageEmbed({
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
      text: "wiki.1hive.org",
    }
  })
}

export function errorDiscourseVerificationEmbed(errorMessage: string): MessageEmbed {
  return new MessageEmbed({
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
      text: "wiki.1hive.org",
    }
  })
}

export function verifyGithubEmbed(
  verificationCode: string,
  githubUsername: string
): MessageEmbed {
  return new MessageEmbed({
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
        value: "Create a [public gist](https://gist.github.com/) called `pollen.md`",
      },
      {
        name: `2. Set code \`${verificationCode}\``,
        value: "Place the code in the body of the gist",
      },
      {
        name: "3. Complete the verification",
        value: `Confirm the previous step using the following command:
        \`!pollen check-github ${verificationCode} ${githubUsername}\``,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "wiki.1hive.org",
    }
  })
}

export function successGithubVerificationEmbed(
  githubUsername: string
): MessageEmbed {
  return new MessageEmbed({
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
      text: "wiki.1hive.org",
    }
  })
}

export function errorGithubVerificationEmbed(errorMessage: string): MessageEmbed {
  return new MessageEmbed({
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
      text: "wiki.1hive.org",
    }
  })
}

export function credEmbed(
  totalCred: number,
  lastWeekCred: number,
  thisWeekCred: number
): MessageEmbed {
  return new MessageEmbed({
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
    }
  })
}
