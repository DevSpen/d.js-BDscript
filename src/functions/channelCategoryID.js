module.exports = {
    name: "$channelCategoryID",
    brackets: true,
    optional: true,
    description: "returns the channel's category ID",
    returns: "?string",
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
            
            return d.deflate(channel.parentID ?? "")
        } else {
            return d.deflate(d.message?.channel?.parentID ?? "")
        }
    }
}