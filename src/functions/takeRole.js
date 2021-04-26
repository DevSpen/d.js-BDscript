module.exports = {
    name: "$takeRole",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID, 
            roleID,
            reason
        ] = (await d.resolveArray()) || []
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        const role = guild.roles.cache.get(roleID)
        
        if (!role) return d.sendError("roleID", roleID)
        
        const r = await member.roles.remove(roleID, reason).catch(err => null)
        
        if (!r) return d.sendError(":x: Failed to take role!")
        
        return d.deflate()
    }
}