## Quickstart

<a href="https://heroku.com/deploy?template=https://github.com/crisog/bee-guard">
<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

Click here to deploy!

## Developer quick start 👩‍💻

`npm run dev` will launch the bot locally, with hot reloading included.

There are a few other scripts provided:

- `start`: Starts up the bot without hot reloading; used for the heroku deployment described below.
- `lint`: Lints the project with ESLint.
- `test`: Runs all the tests! (no tests for now)

### Configuration

First, install the dependencies:
`npm install`
`npm install -D`

If you want your bot to only accept commands on a specific channel and also redirect commands there, you need to give it the `Manage Messages` permission and create a channel which name includes `bot-commands`.

For the bot to run properly, it needs these variables, laid out in the `.env.sample` file:

- `DISCORD_API_TOKEN`: Your discord API token. [See this guide on how to obtain one](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).
- `MONGODB_URI`: Your MongoDB connection URI.
- `GUILD_ID`: Your Discord server ID.
