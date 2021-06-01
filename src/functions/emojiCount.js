module.exports = {
    name: "$emojiCount",
    description: "returns emoji count of a guild",
    returns: "?number",
    fields: [{
        name: "guildID",
        description: "the guild to count emojis from",
        type: "string"
    }, {
        name: "type",
        description: "emoji type to count, `all`, `animated` or `normal`"
    }],
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.guild?.emojis.cache.size ?? "")
        } 
        
        const [
            guildID,
            type = "all"
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(type === "all" ? guild.emojis.cache.size : guild.emojis.cache.filter(e => type === "animated" ? e.animated : !e.animated).size)
    }
}