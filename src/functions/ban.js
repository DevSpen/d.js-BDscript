module.exports = {
    name: "$ban",
    brackets: true,
    description: "ban an user from a guild",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to ban the user from"
    }, {
        name: "userID",
        type: "string",
        description: "the user to ban"
    }, {
        name: "reason",
        type: "string",
        description: "the reason for banning this user"
    }, {
        name: "days",
        type: "number",
        description: "messages to delete that are newer to these days"
    }],
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