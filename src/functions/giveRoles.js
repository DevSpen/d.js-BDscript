module.exports = {
    name: "$giveRoles",
    description: "add multiple roles to an user in a guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild where this action will be done"
    }, {
        name: "userID",
        type: "string",
        description: "the user to give the roles to"
    }, {
        name: "reason",
        type: "string",
        description: "reason for adding the roles, can be left empty"
    }, {
        name: "roles",
        type: "string",
        description: "the ID of every role you want to give to the user, separated by `;`"
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
        
        const m = await member.roles.add(roles, reason).catch(err => null)
        
        if (!m) return d.sendError(`:x: Failed to add roles!`)
        
        return d.deflate()
    }
}