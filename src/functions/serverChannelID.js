module.exports = {
    name: "$serverChannelID",
    brackets: true,
    description: "returns the channel ID of this guild using its name",
    optional: true,
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to search for this channel"
    }, {
        name: "channel name",
        type: "string",
        description: "the channel name"
    }],
    execute: async d => {
        if (d.value.inside) {
            const [guildID, channelName] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
            
            const channel = guild.channels.cache.find(a => a.name === channelName)
            
            if (!channel) return d.sendError("channel name", channelName)
            
            return d.deflate(d.value.id, channel.id) 
        } else {
            return d.deflate(d.value.id, d.message?.channel?.id || "")
        }
    }
}