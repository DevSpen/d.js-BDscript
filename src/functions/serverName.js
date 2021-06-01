module.exports = {
    name: "$serverName",
    brackets: true,
    optional: true,
    returns: "?string",
    description: "the name for this guild",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to return the name from", 
    }],
    execute: async d => {
        if (d.value.inside) {
            const guildID = await d.resolveAll()
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
        
            if (!guild) return d.sendError("guildID", guildID)
            
            return d.deflate(guild.name) 
        } else {
            return d.deflate(d.message?.guild?.name || "")
        }
    }
}