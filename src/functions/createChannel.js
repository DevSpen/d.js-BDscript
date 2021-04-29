module.exports = {
    name: "$createChannel",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            name,
            type,
            category,
            position,
            nsfw,
            topic,
            reason,
            returnID = "no"
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
        
        const ch = await guild.channels.create(name, {
            position: Number(position) || undefined,
            type: type || "text",
            topic: topic || undefined,
            parent: category || undefined,
            reason: reason || undefined,
            nsfw: nsfw === "yes"
        }).catch(err => null)
        
        if (!ch) return d.sendError(`:x: Failed to create channel!`)
        
        return d.deflate(returnID === "yes" ? ch.id : "")
    }
}