module.exports = {
    name: "$channelTopic",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const channelID = await d.resolveAll()
            
            if (channelID === undefined) return undefined
            
            const channel = d.client.channels.cache.get(channelID)
            
            if (!channel) return d.sendError("channelID", channelID)
            
            return d.deflate(channel.topic || "")
        } else {
            return d.deflate(d.message?.channel?.topic || "")
        }
    }
}