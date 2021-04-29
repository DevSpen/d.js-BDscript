module.exports = {
    name: "$createEmoji",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            name,
            url,
            reason, 
            returnEmote = "no", 
            ...roles
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const emote = await guild.emojis.create(url, name, {
            roles,
            reason 
        }).catch(err => null)
        
        if (!emote) return d.sendError(`:x: Failed to create emote!`)
        
        return d.deflate(returnEmote === "yes" ? emote.toString() : "")
    }
}