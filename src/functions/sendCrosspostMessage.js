const { chmod } = require("fs")

module.exports = {
    name: "$sendCrosspostMessage",
    description: "sends a message to multiple channels.",
    brackets: true,
    fields: [
        {
            name: "channels",
            description: "the channel of channels to send this message to, separated by `;`",
            type: "string"
        },
        {
            name: "message",
            description: "the message to send to these channels",
            type: "string"
        }
    ],
    execute: async d => {
        const fields = (await d.resolveArray()) ?? []

        if (!fields.length) return undefined

        const m = fields.pop()

        const channels = fields

        const chs = channels.map(c => d.client.channels.cache.get(c))

        if (chs.includes(undefined)) return d.sendError("channel ID", channels.filter(c => !d.client.channels.cache.has(c)).join(", "))

        for (const c of chs) {
            await d.client.bot.resolveAPIMessage(c, d.container.embed, m)
        }

        return d.deflate(); 
    }
}