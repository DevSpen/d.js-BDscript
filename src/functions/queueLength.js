module.exports = {
    name: "$queueLength",
    returns: "number",
    brackets: true,
    optional: true,
    description: "returns amount of songs in the queue",
    fields: [{
        name: "guildID",
        type: "string",
        description: "guild to get song length from"
    }],
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.client.bot.ytdl_servers.get(d.message?.guild?.id)?.songs.length ?? 0)
        }
        
        const guildID = await d.resolveAll()
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(d.client.bot.ytdl_servers.get(guild.id)?.songs.length ?? 0)
    }
}