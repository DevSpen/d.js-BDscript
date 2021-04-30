module.exports = {
    name: "$highestRole",
    brackets: true,
    returns: "?string",
    description: "returns the user's highest role ID",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to check in"
    }, {
        name: "userID",
        type: "string",
        description: "the user to get the role from"
    }],
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                userID
            ] = (await d.resolveArray()) || [] 
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
            
            const member = await guild.members.fetch(userID).catch(err => null)
          
            if (!member) return d.sendError("userID", userID)
            
            return d.deflate(member.roles.highest.id)
        } else {
            return d.deflate(d.message?.member?.roles.highest.id)
        }
    }
}