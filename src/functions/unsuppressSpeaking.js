module.exports ={
    name: "$unsuppressSpeaking",
    description: "Unsuppresses a user from speaking (only applicable for stage channels).",
    fields: [{
        name: "guildID",
        type: "string",
        description: "The server to perform this action in."
    }, {
        name: "userID",
        type: "string",
        description: "The user to unsuppress."
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
        
        const r = member.voice?.setSuppressed?.(false).catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to unsuppress user speaking!`)
        
        return d.deflate()
    }
}
