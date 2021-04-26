module.exports = {
    name: "$ban",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID,
            reason,
            days
        ] = (await d.resolveArray()) || []
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        const b = await guild.members.ban(user.id, {
            reason,
            days: Number(days) 
        }).catch(err => null)
        
        if (!b) return d.sendError(":x: failed to ban user!")
        
        return d.deflate()
    }
}