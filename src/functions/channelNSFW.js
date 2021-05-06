module.exports = {
    name: "$channelNSFW",
    brackets: true,
    optional: true,
    description: "whether a channel is nsfw",
    returns: "boolean",
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
            
            return d.deflate(channel.nsfw ?? false)
        } else {
            return d.deflate(d.message?.channel?.nsfw ?? false)
        }
    }
}