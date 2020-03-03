# Zulip Topic Minder Bot

This is a simple bot that can be used by communities to help
enforce topic naming conventions in their streams. Look at the
`config.js` file for examples of what can be done with this bot.

## Deployment

1. Fork this repository.
2. `git clone https://github.com/your-fork's-url`.
3. `cd zulip-topic-minder`.
4. `npm install`.
5. Edit the `config.js` file to configure/add rules.
6. Paste the zuliprc file in the folder.
7. `npm start`.

You can also use [pm2](https://pm2.keymetrics.io/) to run the bot:

1. `npm install -g pm2`.
2. `pm2 start index.js --name "topic-minder-bot"`.

## Help

For help/discussion, please start a topic on [chat.zulip.org](https://chat.zulip.org/#narrow/stream/127-integrations)
or open an issue on this repository.
