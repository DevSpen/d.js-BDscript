module.exports = {
    name: "$isChannelViewable",
    brackets: true,
    optional: true,
    description: "Returns whether or not the channel is viewable by the bot.",
    returns: "boolean",
    fields: [{
        name: "channelID",
        type: "string",
        description: "The channel to check."
    }],
    execute: async d => {
        if (d.value.inside) {
            const channelID = await d.resolveAll()
            
            if (channelID === undefined) return undefined
            
            const channel = d.client.channels.cache.get(channelID)
            
            if (!channel) return d.sendError("channelID", channelID)
            
            return d.deflate(channel.viewable ?? false)
        } else {
            return d.deflate(d.message?.channel?.viewable ?? false)
        }
    }
}
