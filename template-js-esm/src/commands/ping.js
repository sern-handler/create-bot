import { CommandType, commandModule } from '@sern/handler';

export default commandModule({
	type: CommandType.Both,
	plugins: [], //optional
	description: 'A ping command',
	//alias : [],
	execute: async (ctx, args) => {
		await ctx.reply('Pong 🏓');
	},
});
