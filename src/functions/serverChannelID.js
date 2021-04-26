module.exports = {
    name: "$serverChannelID",
    brackets: true,
    optional: true,
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