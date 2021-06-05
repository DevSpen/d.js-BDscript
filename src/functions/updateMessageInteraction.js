module.exports = {
    name: "$updateMessageInteraction",
    description: "updates main message of the interaction",
    brackets: true,
    fields: [
        {
            name: "content",
            description: "data to update this interaction with",
            type: "string"
        }
    ],
    execute: async d => {
        const m = await d.resolveAll()

        if (m === undefined) return undefined

        await d.client.bot.resolveAPIMessage(d.data.interaction, d.container, m, "update")

        return d.deflate()
    }
}