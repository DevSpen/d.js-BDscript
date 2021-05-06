module.exports = {
    name: "$joinVoice",
    description: "joins to a voice channel.",
    fields: [{
        name: "channelID",
        description: "the channel to join",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const channelID = await d.resolveAll()
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const r = await channel.join?.().catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to join voice channel!`)
        
        return d.deflate()
    }
}