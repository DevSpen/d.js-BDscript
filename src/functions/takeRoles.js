module.exports = {
    name: "$takeRoles",
    description: "remove multiple roles from an user in a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild where this action will be done"
    }, {
        name: "userID",
        type: "string",
        description: "the user to take the roles from"
    }, {
        name: "reason",
        type: "string",
        description: "reason for removing the roles, can be left empty"
    }, {
        name: "roles",
        type: "string",
        description: "the ID of every role you want to take from the user, separated by `;`"
    }],
    execute: async d => {
        const [
            guildID,
            userID,
            reason,
            ...roles
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return 
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        const m = await member.roles.remove(roles, reason).catch(err => null)
        
        if (!m) return d.sendError(`:x: Failed to take roles!`)
        
        return d.deflate()
    }
}