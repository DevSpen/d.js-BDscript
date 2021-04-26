module.exports = {
    name: "$kick",
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID,
            reason
        ] = (await d.resolveArray()) || []
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        const k = await member.kick(reason).catch(err => null)
        
        if (!k) return d.sendError(":x: failed to kick user!")
        
        return d.deflate()
    }
}