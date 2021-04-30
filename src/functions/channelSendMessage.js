module.exports = {
    name: "$channelSendMessage",
    brackets: true,
    optional: true,
    description: "sends a message to a specific channel.",
    returns: "string",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to send this message to"
    }, {
        name: "message",
        description: "the content for this message",
        type: "string"
    }],
    execute: async d => {
        let [
            channelID,
            data,
            returnMessageID = "no"
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const m = await d.client.bot.resolveAPIMessage(channel, d.container.embed, data)
        
        return d.deflate(returnMessageID === "yes" ? m?.id || "" : "")
    }
}