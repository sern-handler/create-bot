import { CommandType, commandModule } from "@sern/handler";
import { EmbedBuilder } from "discord.js";
import * as sysinfo from 'systeminformation'

export default commandModule({ 
    type: CommandType.Both,
    description: "Check computer server stats",
    execute: async (ctx, args) => {
        const cpu = await sysinfo.cpu()
        const embed = new EmbedBuilder()
            .setAuthor({ name: ctx.user.username, iconURL: ctx.user.displayAvatarURL() })
            .setColor('Green')
            .setFields(
                { name: 'CPU Brand', value: cpu.brand, inline: true },
                { name: 'CPU Cores', value: cpu.cores.toString() },
            )
            ctx.reply({ embeds: [embed] })
    }
})