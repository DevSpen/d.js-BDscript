module.exports = {
    name: "$isRoleEditable",
    description: "Returns if a role is editable by the bot.", 
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "The server to get the role from."
    }, {
        name: "roleID",
        type: "string",
        description: "The role to check."
    }], 
    returns: "boolean",
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
        
        return d.deflate(role.editable)
    }
}
