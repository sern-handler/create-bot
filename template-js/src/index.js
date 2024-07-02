/// <reference path="dependencies.d.ts" />
import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js';
import { Sern, makeDependencies } from '@sern/handler';
import {  Publisher } from '@sern/publisher'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent, // Make sure this is enabled for text commands!
	],
});

/**
 * Where all of your dependencies are composed.
 * '@sern/client' is usually your Discord Client.
 * Use this function to access all of your dependencies.
 * This is used for external event modules as well
 */
await makeDependencies(({ add }) => {
    add('@sern/client', client);
    add('publisher', new Publisher());
});

//View docs for all options
Sern.init({
    defaultPrefix: '!', // removing defaultPrefix will shut down text commands
    commands: 'src/commands',
    // events: 'src/events', //(optional)
});

client.login();
