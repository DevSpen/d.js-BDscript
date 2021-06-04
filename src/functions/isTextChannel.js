module.exports = {
    name: "$isTextChannel",
    brackets: true,
    optional: true,
    description: "Returns whether or not a channel is a text channel.",
    returns: "boolean",
    fields: [{
        name: "channelID",
        type: "string",
        description: "The ID of the channel to check."
    }],
    execute: async d => {
        if (d.value.inside) {
            const channelID = await d.resolveAll()
            
            if (channelID === undefined) return undefined
            
            const channel = d.client.channels.cache.get(channelID)
            
            if (!channel) return d.sendError("channelID", channelID)
            
            return d.deflate(channel.isText() || "")
        } else {
            return d.deflate(d.message?.channel?.isText() || "")
        }
    }
}
