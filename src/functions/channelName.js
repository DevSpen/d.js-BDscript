module.exports = {
    name: "$channelName",
    brackets: true,
    optional: true,
    description: "the message channel name",
    returns: "string",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the ID for this channel"
    }],
    execute: async d => {
        if (d.value.inside) {
            const channelID = await d.resolveAll()
            
            if (channelID === undefined) return undefined
            
            const channel = d.client.channels.cache.get(channelID)
            
            if (!channel) return d.sendError("channelID", channelID)
            
            return d.deflate(channel.name || "")
        } else {
            return d.deflate(d.message?.channel?.name || "")
        }
    }
}