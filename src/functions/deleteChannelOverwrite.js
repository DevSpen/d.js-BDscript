const DiscordUtil = require("../utils/discord")

module.exports = {
    name: "$deleteChannelOverwrite",
    description: "deletes a channel overwrite",
    brackets: true,
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to delete an overwrite"
    }, {
        name: "user/role",
        type: "string",
        description: "the user or role ID to remove the overwrites from"
    }, {
        name: "reason",
        description: "reason for deleting a channel overwrite",
        type: "string"
    }],
    execute: async d => {
        const [
            channelID,
            id
        ] = (await d.resolveArray()) ?? []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        
        const ch = await channel.permissionOverwrites.get(id)?.delete(reason).catch(err => null)
        
        if (!ch) return d.sendError(`:x: Failed to delete channel overwrite!`)
        
        return d.deflate()
    }
}