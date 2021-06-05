const { validate } = require("../utils/discord")

module.exports = {
    name: "$removeMessageButtons",
    description: "remove all buttons from a message",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel where the message was sent in",
            type: "string"
        },
        {
            name: "messageID",
            description: "the message to remove the buttons from",
            type: "string"
        }
    ],
    execute: async d => {
        const [
            channelID,
            messageID
        ] = (await d.resolveArray()) ?? []

        if (channelID === undefined) return undefined

        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError(`channel ID`, channelID)

        const m = validate(messageID) ? await channel.messages.fetch(messageID).catch(() => null) : null

        if (!m) return d.sendError(`message ID`, messageID)

        const verify = await m.edit(m.content, {
            components: []
        }).catch(err => err.message)

        if (typeof verify === "string") return d.sendError(`:x: Failed to remove message buttons! (${verify})`)

        return d.deflate()
    }
}