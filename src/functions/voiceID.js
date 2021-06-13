module.exports = {
    name: "$voiceID",
    brackets: true,
    optional: true,
    description: "returns this user's voice channel ID in the guild",
    returns: "?string",
    fields: [{
        name: "guildID",
        description: "the guild to get the user voice channel",
        type: "string"
    }, {
        name: "userID",
        description: "the user to get voice channel",
        type: "string"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.member?.voice.channelID ?? "")
        }

        const [
            guildID,
            userID
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined

        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
            
        const member = await guild.members.fetch(userID).catch(err => null)
          
        if (!member) return d.sendError("userID", userID)
        
        return d.deflate(member.voice.channelID ?? "")
    }
}