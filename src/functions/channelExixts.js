module.exports = {
    name: "$channelExists",
    brackets: true,
    execute: async d => {
        const channelID = await d.resolveAll()
        
        if (channelID === undefined) return undefined
        
        return d.deflate(d.client.channels.cache.has(channelID))
    }
}