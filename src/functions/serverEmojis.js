module.exports = {
    name: "$serverEmojis",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                option = "name",
                separator = ", ",
                animated = "yes"
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
        
            const emojis = guild.emojis.cache.filter(a => animated === "yes" ? true : !a.animated)
            
            return d.deflate(option === "count" ? emojis.size : emojis.map(em => option === "mention" ? em.toString() : em[option] ?? "").join(separator))
        } else {
            return d.deflate(d.message?.guild?.emojis.cache.map(em => em.toString()).join(", "))
        }
    }
}