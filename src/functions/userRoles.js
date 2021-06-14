module.exports = {
    name: "$userRoles",
    brackets: true,
    description: "returns all the roles for this user",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to list user roles from"
    }, {
        name: "userID",
        type: "string",
        description: "the user to list roles from"
    }, {
        name: "option",
        type: "string",
        description: "the property to return for each user role, can be `name`, `mention`, `id`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each role"
    }, {
        name: "sort",
        type: "boolean",
        description: "whether to sort the roles by position"
    }],
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                userID,
                option = "name",
                separator = ", ",
                sort = "no"
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined 
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError(`:x: Invalid guildID in \`${d.value.func.name}\``)
            
            const member = await guild.members.fetch(userID).catch(err => null)
            
            if (!member) return d.sendError(`:x: Invalid userID in \`${d.value.func.name}\``)
            
            const roles = member.roles.cache.filter(r => r.id !== d.message.guild.id).sort((x, y) => sort === "yes" ? y.position - x.position : true).map(r => option === "mention" ? r.toString() : r[option] ?? "")
            
            return d.deflate(d.value.id, option === "count" ? roles.length : roles.join(separator))
        } else {
            const roles = d.message.member ? d.message.member.roles.cache.filter(r => r.id !== d.message.guild.id).map(r => r.name) : []
            
            return d.deflate(d.value.id, roles.join(", "))
        }
    }
}