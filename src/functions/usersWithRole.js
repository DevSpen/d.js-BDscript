module.exports = {
    name: "$usersWithRole",
    description: "returns cached members with given role in a guild",
    returns: "?string|number",
    brackets: true,
    fields: [{
        name: "guildID",
        description: "the guild to get role members from",
        type: "string"
    }, {
        name: "roleID",
        description: "the role to get members",
        type: "string"
    }, {
        name: "option",
        description: "the option for each member, can be `username`, `mention`, `count`, etc...",
        type: "string"
    }, {
        name: "separator",
        description: "the separator for each member",
        type: "string"
    }],
    execute: async d => {
        const [
            guildID,
            roleID,
            option = "username",
            separator = ", "
        ] = (await d.resolveArray()) ?? []
        
        if (guildID=== undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
            
        if (!guild) return d.sendError("guildID", guildID)
            
        const role = guild.roles.cache.get(roleID)
          
        if (!role) return d.sendError("roleID", roleID)
        
        return d.deflate(option === "count" ? role.members.size : role.members.map(m => option === "mention" ? m.toString() : m[option] ?? m.user[option] ?? "").join(separator))
    }
}