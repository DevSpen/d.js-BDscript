module.exports = {
    name: "$serverRoles",
    brackets: true,
    optional: true,
    description: "returns all the roles for this guild",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to list roles from"
    }, {
        name: "option",
        type: "string",
        description: "the property to return for each role, can be `name`, `mention`, `id`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each role"
    }, {
        name: "sort",
        type: "boolean",
        description: "whether to sort the roles by position"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.guild?.roles.cache.filter(r => r.id !== d.message?.guild?.id).map(r => r.name).join(", "))
        }
        
        const [
            guildID,
            option = "name",
            separator = ", ",
            sort = "no",
        ] = (await d.resolveArray()) || []
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(option === "count" ? guild.roles.cache.size : guild.roles.cache.filter(r => r.id !== guild.id).sort((x, y) => sort === "yes" ? y.position - x.position : true).map(r => option === "mention" ? r.toString() : r[option] ?? "").join(separator))
    }
}