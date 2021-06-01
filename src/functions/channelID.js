module.exports = {
    name: "$channelID",
    brackets: true,
    optional: true,
    description: "the message channel ID",
    returns: "string",
    fields: [{
        name: "channel name",
        type: "string",
        description: "the name for this channel"
    }],
    execute: async d => {
        if (d.value.inside) {
            const data = await d.resolveAll()
            
            if (data === undefined) return undefined
            
            const channel = d.client.channels.cache.find(c => c.name === data)
            
            if (!channel) return d.sendError("channelID", data)
            
            return d.deflate(d.value.id, channel.id) 
        } else {
            return d.deflate(d.value.id, d.message?.channel?.id)
        }
    }
}