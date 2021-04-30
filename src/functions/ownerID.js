module.exports = {
    name: "$ownerID",
    brackets: true,
    description: "returns a guild owner ID",
    fields: [{
        name: "guildID",
        description: "the guild to get the owner ID from",
        type: "string"
    }],
    returns: "?string",
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            
            return d.deflate(d.message?.guild?.ownerID)
        }
        
        const guildID = await d.resolveAll()
        
        if (guildID === undefined) return undefined 
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(guild.ownerID)
    }
}