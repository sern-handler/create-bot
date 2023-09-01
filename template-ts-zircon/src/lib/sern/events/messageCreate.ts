import { discordEvent } from "@sern/handler";


export default discordEvent({
    name: 'messageCreate',
    execute: async (m) => {
        //Please remove unless you really want this
        if(m.content === 'Smell ya later') {
            await m.reply('Ok fine. I guess you don\'t love me. 💔')
            process.exit(0)
        }
    }
})
