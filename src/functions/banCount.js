module.exports = {
    name: "$banCount",
    brackets: true,
    description: "returns ban count for a guild",
    optional: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get ban count from"
    }],
    returns: "?number",
    execute: async d => {
        if (!d.value.inside) {
            const bans = await d.message?.guild?.bans.fetch().catch(err => null)
            if (!bans) return d.sendError(`:x: Failed to fetch bans`)
            return d.deflate(bans.size)
        }
        
        const [
            guildID,
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const bans = await guild.fetchBans().catch(err => null)
        
        if (!bans) return d.sendError(`:x: Failed to fetch bans`)
            
        return d.deflate(bans.size)
    }
}