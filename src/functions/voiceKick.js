module.exports ={
    name: "$voiceKick",
    description: "kicks an user from voice channel",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to take this action in"
    }, {
        name: "userID",
        type: "string",
        description: "the user to kick"
    }, {
        name: "reason",
        type: "string",
        description: "reason for kicking the user"
    }],
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID,
            reason
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        const r = member.voice?.kick?.(reason).catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to voice kick user!`)
        
        return d.deflate()
    }
}