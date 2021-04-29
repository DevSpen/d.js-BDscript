module.exports = {
    name: "$serverRoles",
    brackets: true,
    optional: true,
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