module.exports = {
    name: "$memberIDs",
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