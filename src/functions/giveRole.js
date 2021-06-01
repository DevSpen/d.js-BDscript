module.exports = {
    name: "$giveRole",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild where we want to give a role"
    }, {
        name: "userID",
        type: "string",
        description: "the user to give the role to"
    }, {
        name: "roleID",
        type: "string",
        description: "the role to give"
    }, {
        name: "reason",
        type: "string",
        description: "the reason for giving this role"
    }],
    description: "gives a role to an user in a guild",
    execute: async d => {
        const [
            guildID,
            userID, 
            roleID,
            reason
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const member = await guild.members.fetch(userID).catch(err => null)
        
        if (!member) return d.sendError("userID", userID)
        
        const role = guild.roles.cache.get(roleID)
        
        if (!role) return d.sendError("roleID", roleID)
        
        const r = await member.roles.add(roleID, reason).catch(err => null)
        
        if (!r) return d.sendError(":x: Failed to give role!")
        
        return d.deflate()
    }
}