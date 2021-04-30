module.exports = {
    name: "$memberIDs",
    description: "returns the cached member IDs of a guild",
    fields: [{
        name: "guildID",
        description: "the guild to list members from",
        type: "string"
    }, {
        name: "option",
        description: "the property to return for each member, could be `mention`, `name`, `id`...",
        type: "string"
    }, {
        name: "separator",
        description: "the separator for each member",
        type: "string"
    }, {
        name: "countBots",
        description: "whether to return bots too",
        type: "boolean"
    }],
    returns: "?string",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                option = "name",
                separator = ", ",
                countBots = "yes"
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
            
            return d.deflate(guild.members.cache.filter(m => countBots === "yes" ? true : m.user.bot === false).map(m => option === "mention" ? m.toString() : m.user?.[option] ?? "").join(separator))
        } else {
            return d.deflate(d.message?.guild?.members.cache.map(m => m.id).join(", "))
        }
    }
}