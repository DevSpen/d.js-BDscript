const DiscordUtil = require("../utils/discord")

module.exports = {
    name: "$deleteChannelOverwrites",
    description: "deletes all the channel's overwrites",
    brackets: true,
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to delete all its overwrites"
    }, {
        name: "reason",
        type: "string",
        description: "reason for deleting channel overwrites" 
    }],
    execute: async d => {
        const [
            channelID,
            reason 
        ] = (await d.resolveArray()) ?? []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const ch = await channel.overwritePermissions([], reason).catch(err => null)
        
        if (!ch) return d.sendError(`:x: Failed to delete channel overwrites!`)
        
        return d.deflate()
    }
}