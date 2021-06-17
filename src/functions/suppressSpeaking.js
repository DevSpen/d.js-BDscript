module.exports ={
    name: "$suppressSpeaking",
    description: "Suppresses a user from speaking (only applicable for stage channels).",
    fields: [{
        name: "guildID",
        type: "string",
        description: "The server to suppress this user's speaking in."
    }, {
        name: "userID",
        type: "string",
        description: "The user to suppress."
    }],
    brackets: true,
    execute: async d => {
        const [
            guildID,
            userID
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        const r = member.voice?.setSuppressed?.(true).catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to suppress user speaking!`)
        
        return d.deflate()
    }
}
