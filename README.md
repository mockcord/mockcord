# Mockcord

### Note that Mockcord is still under heavy development and is in no way functional for integration testing yet.

Mockcord is a self-hostable Mock Discord backend implementation for integration testing written in TypeScript.

## Why?
[Discord doesn't allow it's users to create selfbots](https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-) which makes automated testing on the actual platform pretty annoying because you would need your bot to listen to messages from other bots (which could cause issues if you forgot to disable it in production). Other issues include large rate limits for specific endpoints like channel edits, message sending (at least when you want to test a lot of commands very fast it's too large), testing with things like server boosting (mostly regarding the role assignment part) and limitations of bot-with-bot interaction in certain cases.

## Isn't this against the Discord (Developer) Terms of Service/Discord Developer Policy?
From my understanding: **no**. While the Discord Developer Policy says

> **You will not:** 
> - [...]
> - create an application that functions substantially the same as the APIs and offer it for use by third parties
> - [...]

it sounds like this **only** applies to API recreations for production use. \
For this reason Mockcord has a few limitations set in place to make it impossible to use in production without modification of the source code.

## Limitations
- Mockcord doesn't connect to any database and doesn't save any data; users, guilds, channels, etc only exist in RAM for the run time of the API
- Mockcord doesn't implement any endpoints or gateway events that bots can't use (except for where it's beneficial for integration testing if a non-bot user can use it, e.g. boosting a server)

## Benefits
- Ratelimitless integration testing (rate limits can be enabled via enviroment variables though)
- Ability to test with endpoints that most developers normally can't play around with since they require specific guild features (e.g. publishing/crossposting messages from a news channel)

## Goals
- Hassle-free Discord bot integration testing
- Helping Discord bot developers squash 'em bugs
- Learning how Discord's backend works on a technical level

## Non-Goals
- Being used as a "self-hostable Discord alternative"

## Contributing
Feel free to contribute to the project but please make sure you at least put effort into formatting your code (we don't have any automated formatting checks set in place yet since Mockcord is in early development).

## Development Setup Instructions

### Note that a UNIX enviroment is required for development at the moment (WSL works fine)
```console
$ git clone https://github.com/mockcord/mockcord.git
$ cd mockcord/

// pnpm
$ pnpm install

// Yarn
$ yarn install

// npm
$ npm install
```
Then copy/rename `.env.example` to `.env` and edit it to your likings. \
Then run Mockcord using:
```console
// pnpm
$ pnpm start

// Yarn
$ yarn start

// npm
$ npm install
```