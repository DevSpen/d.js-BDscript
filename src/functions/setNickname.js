module.exports = {
    name: "$setNickname",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to set this member nickname on"
    }, {
        name: "userID",
        type: "string",
        description: "the user to set the nickname"
    }, {
        name: "nickname",
        type: "string",
        description: "the new nickname for the user, leave empty to remove nickname"
    }],
    description: "sets a member nickname",
    execute: async d => {
        const [
            guildID,
            userID,
            nick
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
            
        const member = await guild.members.fetch(userID).catch(err => null)
          
        if (!member) return d.sendError("userID", userID)
        
        const m = await member.setNickname(nick).catch(err => null)
        
        if (!m) return d.sendError(`:x: Failed to change nickname!`)
        
        return d.deflate() 
    }
}