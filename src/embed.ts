/* eslint-disable quotes */
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
        text: "wiki.1hive.org",
      },
    },
  };
}

export function walletWarningEmbed(): unknown {
  return {
    embed: {
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
    },
  };
}

export function pollenEmbed(): unknown {
  return {
    embed: {
      color: 16769024,
      author: {
        name: "Pollen bot",
        url: "https://github.com/1Hive/pollen-bot",
      },
      description:
        "[Pollen](https://wiki.1hive.org/getting-started/pollen) is a contributor rank used to recognize contributions to 1hive’s discord, discourse, and github communities. These contributions are rewarded with weekly distributions of Honey.",
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
        text: "wiki.1hive.org",
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
        text: "wiki.1hive.org",
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
        text: "wiki.1hive.org",
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
        text: "wiki.1hive.org",
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
        text: "wiki.1hive.org",
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
        text: "wiki.1hive.org",
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
        text: "wiki.1hive.org",
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
