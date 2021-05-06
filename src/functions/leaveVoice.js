module.exports = {
    name: "$leaveVoice",
    description: "leaves a voice channel.",
    fields: [{
        name: "channelID",
        description: "the channel to leave",
        type: "string"
    }],
    brackets: true,
    execute: async d => {
        const channelID = await d.resolveAll()
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const r = await channel.leave?.().catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to leave voice channel!`)
        
        return d.deflate()
    }
}