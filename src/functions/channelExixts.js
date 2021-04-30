module.exports = {
    name: "$channelExists",
    brackets: true,
    description: "check whether or not given channel ID exists",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to check for"
    }],
    returns: "boolean",
    execute: async d => {
        const channelID = await d.resolveAll()
        
        if (channelID === undefined) return undefined
        
        return d.deflate(d.client.channels.cache.has(channelID))
    }
}