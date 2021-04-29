module.exports = {
    name: "$roleName",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            roleID 
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const role = guild.roles.cache.get(roleID)
        
        if (!role) return d.sendError("role ID", roleID)
        
        return d.deflate(role.name)
    }
}