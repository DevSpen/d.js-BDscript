module.exports ={
    name: "$voiceDeafen",
    description: "server deafens an user from voice channels",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to deafen this user in"
    }, {
        name: "userID",
        type: "string",
        description: "the user to deafen"
    }, {
        name: "reason",
        type: "string",
        description: "reason for deafening the user"
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
        
        const r = member.voice?.setDeaf?.(true, reason).catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to voice deafen user!`)
        
        return d.deflate()
    }
}