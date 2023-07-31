import { CommandType, commandModule } from "@sern/handler";

export default commandModule({
    type: CommandType.Both,
    description: "foxes",
    async execute(ctx, args) {
        ctx.reply(
            await fetch("https://randomfox.ca/floof/")
                .then(res=> res.json())
                .then(res=>res.image)
        )
    },
})