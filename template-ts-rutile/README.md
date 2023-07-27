# Discord Bot Template as a Service

## Prerequisites 
- Average understanding of discord.js, sern handler, typescript, mongoose

## Tools Used
- sern handler 
- mongoose
- typescript
- pino

## To get started
```sh
npm install -g yarn
npm install -g @sern/cli
```

## Faatures
- This template has everything needed and many things preconfigured to operate a fully working discord bot
- Logging has little / no overhead, as this logger runs on a worker thread.
- creating commands and publishing to the discord api is simple with sern and its cli

## Running the bot
- Ensure everything in .env.example has been filled and put in a .env file.
```sh
yarn build
yarn start
```

## Documentation 
- [sern](https://sern.dev/docs/intro)
- [discord.js](https://discord.js.org/#/)
- [mongoose](https://mongoosejs.com/)
- [pino](https://github.com/pinojs/pino)


## Directories 
- src
    - commands
        - all commands configured by sern.
    - lib
        - extra code (think utils) that may be needed to help the bot function
    - plugins
        - sern plugins. These help configure your command's behavior
    - services 
        - Classes that act as services and perform tasks across commands
- logs
    - when the bot is in PROD mode, this directory will be populated with logs

## Need Help?
- Come visit the [discord](https://sern.dev/discord) for live help. 
