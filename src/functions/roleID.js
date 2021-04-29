module.exports = {
    name: "$roleID",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            name 
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const role = guild.roles.cache.find(r => r.name === name) 
        
        if (!role) return d.sendError("role name", name)
        
        return d.deflate(role.id)
    }
}