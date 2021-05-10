module.exports = {
    name: "$skip",
    description: "skips the currently playing song for this guild",
    fields: [{
        name: "guildID",
        description: "the guild to execute this action in",
        type: "string"
    }],
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            const data = d.client.bot.ytdl_servers.get(d.message?.guild?.id)
            
            if (!data) return d.sendError(":x: Nothing playing!")
            
            data.connection.dispatcher?.end()
            
            return d.deflate()
        }
        
        const guildID = await d.resolveAll()
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const data = d.client.bot.ytdl_servers.get(guild.id)
        
        data.connection.dispatcher?.end()
        
        return d.deflate() 
    }
}