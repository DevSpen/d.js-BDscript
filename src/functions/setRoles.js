module.exports = {
    name: "$setRoles",
    description: "set roles to an user in a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild where this action will be done"
    }, {
        name: "userID",
        type: "string",
        description: "the user to set their roles to"
    }, {
        name: "reason",
        type: "string",
        description: "reason for setting the roles, can be left empty"
    }, {
        name: "roles",
        type: "string",
        description: "the ID of every role you want to set to this user, separated by `;`"
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
        
        const m = await member.roles.set(roles ?? [], reason).catch(err => null)
        
        if (!m) return d.sendError(`:x: Failed to set roles!`)
        
        return d.deflate()
    }
}