import { Client, GatewayIntentBits } from 'discord.js';
import { Sern, makeDependencies, single } from '@sern/handler';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent, //Make sure this is enabled for text commands!
	],
});

/**
  * Where all of your dependencies are composed.
  * '@sern/client' is usually your Discord Client.
  * Use this function to access all of your dependencies.
  * This is used for external event modules as well
  */
await makeDependencies(({ add }) => {
    add('@sern/client', single(() => client));
});


//View docs for all options
Sern.init({
    defaultPrefix: '!', // removing defaultPrefix will shut down text commands
    commands: 'dist/commands',
    // events: 'dist/events', //(optional)
});

client.login();
