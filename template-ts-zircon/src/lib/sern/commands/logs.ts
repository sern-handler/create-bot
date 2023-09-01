import { requirePermission } from "#plugins/requirePermission.js";
import { CommandType, commandModule } from "@sern/handler";
import { Attachment, AttachmentBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { readdir, readFile } from "fs/promises";
import { EOL } from "os";
import { basename, join, resolve } from "path";


export default commandModule({ 
    type: CommandType.Both,
    plugins: [requirePermission('user', [ PermissionFlagsBits.Administrator ])],
    description: 'view logs',
    execute: async (ctx) => {
        const logFiles = await readdir(resolve('logs'))
        /**
         * Reads all the files and take buffers concurrently
         */
        const fileContents = await Promise
            .all(logFiles
                .map( path => readFile(join('logs', path))))
                
        await ctx.reply({
            ephemeral:true,
            files: fileContents.map((data,i) => ({ attachment: data, name: basename(logFiles[i]) }))
        });
        
    }
})
