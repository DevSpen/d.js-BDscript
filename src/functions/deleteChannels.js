module.exports = {
    name: "$deleteChannels",
    description: "delete a channel or channels of a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to delete the channels in"
    }, {
        name: "channelIDs",
        type: "string",
        description: "the channel or channel IDs to delete, separated by `;`"
    }],
    execute: async d => {
        const [
            guildID,
            ...ids
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        for (const id of ids) {
            const ch = guild.channels.cache.get(id)
            
            if (!ch) return d.sendError(`channelID`, id)
            
            const del = await ch.delete().catch(err => null)
            
            if (!del) return d.sendError(`:x: Failed to delete channel!`)
            
        }
        
        return d.deflate()
    }
}