module.exports = {
    name: "$publishMessage",
    description: "Publishs a message (only works for messages sent in a announcement channel).",
    brackets: true,
    fields: [{
        name: "channelID",
        description: "The channel where this message was sent.",
        type: "string"
    }, {
        name: "messageID",
        description: "The message to publish.",
        type: "string"
    }],
    execute: async d => {
        const [
            channelID,
            messageID
        ] = (await d.resolveArray()) || []

        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)

        if (!channel) return d.sendError("channelID", channelID)

        const msg = await channel.messages.fetch(messageID).catch(err => null) 

        if (!msg) return d.sendError("messageID", messageID)

        const sup = await msg.crosspost().catch(err => null)

        if (!sup) return d.sendError(`:x: Failed to publish message!`)

        return d.deflate()
    }
}
