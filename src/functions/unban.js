module.exports = {
    name: "$unban",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to unban the user from"
    }, {
        name: "userID",
        type: "string",
        description: "the user to unban"
    }, {
        name: "reason",
        type: "string",
        description: "the reason for unbanning this user"
    }],
    description: "unban an user from a guild",
    execute: async d => {
        const [
            guildID,
            userID,
            reason
        ] = (await d.resolveArray()) || []
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const user = await d.client.users.fetch(userID).catch(err => null)
        
        if (!user) return d.sendError("userID", userID)
        
        const b = await guild.members.unban(user.id, reason).catch(err => null)
        
        if (!b) return d.sendError(":x: failed to unban user!")
        
        return d.deflate()
    }
}