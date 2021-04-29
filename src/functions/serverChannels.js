module.exports = {
    name: "$serverChannels",
    brackets: true,
    optional: true,
    execute: async d => {
        if (d.value.inside) {
            const [
                guildID,
                option = "name",
                separator = ", ",
                ...filters
            ] = (await d.resolveArray()) || []
            
            if (guildID === undefined) return undefined
            
            const guild = d.client.guilds.cache.get(guildID)
            
            if (!guild) return d.sendError("guildID", guildID)
        
            const channels = guild.channels.cache.filter(a => filters.length ? filters.includes(a.type) : true)
            
            return d.deflate(option === "count" ? channels.size : channels.map(ch => option === "mention" ? ch.toString() : ch[option] ?? "").join(separator))
        } else {
            return d.deflate(d.message?.guild?.channels.cache.map(ch => ch.name).join(", "))
        }
    }
}