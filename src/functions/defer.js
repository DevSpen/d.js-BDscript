module.exports = {
    name: "$defer",
    description: "defers command interaction response (in case it would taker longer than 3 seconds)",
    fields: [
        {
            name: "ephemeral",
            description: "whether the response will be ephemeral",
            type: "boolean"
        }
    ],
    brackets: true,
    optional: true, 
    execute: async d => {
        d.container.replyWaiting = true
        
        if (d.value.inside) {
            const e = await d.resolveAll()

            if (e === "yes") await d.message?.defer?.(true)

            return d.deflate()
        }

        await d.message?.defer?.(false)

        return d.deflate()
    }
}