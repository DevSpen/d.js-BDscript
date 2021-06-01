module.exports = {
    name: "$fetchGuildMembers",
    description: "fetches all the members of a guild, requires guild members intent.",
    optional: true,
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to fetch members from"
    }],
    execute: async d => {
        if (!d.value.inside){
            const res = await d.message?.guild?.members.fetch().catch(err => null)
            if (!res) return d.sendError(`:x Failed to fetch members!`)
            return d.deflate()
        }
        
        const guildID = await d.resolveAll()
        
        if (guildID) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const res = await guild.members.fetch().catch(err => null)
        
        if (!res) return d.sendError(`:x Failed to fetch members!`)
            
        return d.deflate()
    }
}