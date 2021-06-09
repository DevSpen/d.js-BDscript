module.exports = {
    name: "$channelSendMessage",
    brackets: true,
    optional: true,
    aliases: ["$sendMessage"],
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
    }, {
        name: "returnMessageID",
        type: "boolean",
        description: "whether to return the ID of the message that was sent"
    }],
    execute: async d => {
        let [
            channelID,
            data,
            returnMessageID = "no"
        ] = (await d.resolveArray()) ?? []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const m = await d.client.bot.resolveAPIMessage(channel, d.container, data)
        
        return d.deflate(returnMessageID === "yes" ? m?.id || "" : "")
    }
}