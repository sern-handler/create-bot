import { requirePermission } from "#plugins/requirePermission.js";
import { CommandType, Services, commandModule } from "@sern/handler";
import { ApplicationCommandOptionType, PermissionFlagsBits, User } from 'discord.js'

export default commandModule({ 
    type: CommandType.Both,
    description: "Warn a user",
    plugins: [requirePermission("both", [PermissionFlagsBits.Administrator])],
    options: [
        { type: ApplicationCommandOptionType.User , name: 'user', description: 'user to warn', required: true }
    ],
    execute: async (ctx, [type, args]) => {
        const [db, client] = Services('database', '@sern/client')
        let user: User;
        if(type === 'slash') {
            user = args.getUser('user', true)
        } else {
            user = await client.users.fetch(args[0])
        }
        const result = await db.addWarning(user.id)
        if(result === null) {
            return ctx.reply("Failed to warn"+user);
        }
        ctx.reply(user+" has been warned.")
    }
})

