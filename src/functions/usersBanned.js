module.exports = {
    name: "$usersBanned",
    brackets: true,
    description: "returns banned users for a guild",
    optional: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get banned users from"
    }, {
        name: "option",
        type: "string",
        description: "the property to return for each user, can be `count`, `id`, `username`, `mention`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each user"
    }],
    returns: "?number",
    execute: async d => {
        if (!d.value.inside) {
            const bans = await d.message?.guild?.fetchBans().catch(err => null)
            if (!bans) return d.sendError(`:x: Failed to fetch bans`)
            return d.deflate(bans.map(d => d.user.username).join(", "))
        }
        
        const [
            guildID,
            option = "username",
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const bans = await guild.fetchBans().catch(err => null)
        
        if (!bans) return d.sendError(`:x: Failed to fetch bans`)
            
        return d.deflate(option === "count" ? bans.size : bans.map(u => option === "mention" ? u.user.toString() : u.user[option] ?? "").join(separator))
    }
}