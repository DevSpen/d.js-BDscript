module.exports = {
    name: "$memberCount",
    description: "returns the member count of a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get the member count from" 
    }],
    returns: "?number", 
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()
            
            if (guildID === undefined) return 
            
            const guild = d.client.guilds.cache.get(guildID)
        
            if (!guild) return d.sendError("guildID", guildID)
            
            return d.deflate(guild.memberCount)
        } else {
            return d.deflate(d.message?.guild?.memberCount ?? "")
        }
    }
}
