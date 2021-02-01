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

For the bot to run properly, it needs these variables, laid out in the `.env.sample` file:

- `DISCORD_API_TOKEN`: Your discord API token. [See this guide on how to obtain one](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).
- `WEB3_URL`: You can use `ws://localhost:8545` to run the bot locally.
- `CHANNEL_ID`: Your Server Channel ID.
