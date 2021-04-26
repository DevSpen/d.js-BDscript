module.exports = {
    name: "$channelType",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const channelID = await d.resolveAll()
            
            if (channelID === undefined) return undefined
            
            const channel = d.client.channels.cache.get(channelID)
            
            if (!channel) return d.sendError("channelID", channelID)
            
            return d.deflate(channel.type || "")
        } else {
            return d.deflate(d.message?.channel?.type || "")
        }
    }
}