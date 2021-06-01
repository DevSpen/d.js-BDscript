module.exports = {
    name: "$kick",
    brackets: true,
    description: "kick an user from a guild",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to kick the user from"
    }, {
        name: "userID",
        type: "string",
        description: "the user to kick"
    }, {
        name: "reason",
        type: "string",
        description: "the reason for kicking this user"
    }],
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