import { Client, GatewayIntentBits } from 'discord.js';
import {
	Sern,
	single,
        makeDependencies
} from '@sern/handler';

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
 * View documentation for pluggable dependencies
 * Configure your dependency root to your liking.
 * It follows the npm package iti https://itijs.org/.
 * Use this function to access all of your dependencies.
 * This is used for external event modules as well
 */
async function init() {
    await makeDependencies({
        build: (root) =>
         	root.add({ '@sern/client': single(() => client) })
         });
         
    //View docs for all options
    Sern.init({
        defaultPrefix: '!', // removing defaultPrefix will shut down text commands
        commands: 'dist/commands',
        // events: 'dist/events' (optional),
    });
}


client.login();
