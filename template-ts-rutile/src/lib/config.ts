import { ClientOptions, IntentsBitField } from "discord.js";

const intents =	IntentsBitField.Flags.Guilds |
	        IntentsBitField.Flags.GuildMembers |
	        IntentsBitField.Flags.GuildMessages |
	        IntentsBitField.Flags.MessageContent //Make sure this is enabled for text commands!

//Configure your bot's options here
export const config = {
    intents,
} satisfies ClientOptions
