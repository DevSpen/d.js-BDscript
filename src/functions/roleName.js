module.exports = {
    name: "$roleName",
    description: "returns a role name of a guild", 
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get the role name from"
    }, {
        name: "roleID",
        type: "string",
        description: "the ID of the role"
    }], 
    returns: "string",
    execute: async d => {
        const [
            guildID,
            roleID 
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const role = guild.roles.cache.get(roleID)
        
        if (!role) return d.sendError("role ID", roleID)
        
        return d.deflate(role.name)
    }
}