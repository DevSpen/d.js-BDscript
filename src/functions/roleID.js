module.exports = {
    name: "$roleID",
    description: "returns a role ID of a guild", 
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get the role ID from"
    }, {
        name: "role name",
        type: "string",
        description: "the name of the role"
    }], 
    returns: "string",
    execute: async d => {
        const [
            guildID,
            name 
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const role = guild.roles.cache.find(r => r.name === name) 
        
        if (!role) return d.sendError("role name", name)
        
        return d.deflate(role.id)
    }
}