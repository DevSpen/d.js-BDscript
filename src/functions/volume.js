module.exports = {
    name: "$volume",
    description: "sets the song volume for a guild",
    fields: [{
        name: "guildID",
        description: "the guild to execute this action in",
        type: "string"
    }, {
        name: "volume",
        type: "number",
        description: "the new volume for the songs"
    }],
    brackets: true,
    execute: async d => {
        const [
            guildID,
            volume
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const data = d.client.bot.ytdl_servers.get(guild.id)
        
        data.connection.dispatcher?.setVolume(Number(volume) / 100 ?? 1)
        
        d.client.bot.ytdl_servers.get(guild.id).volume = Number(volume) ?? 100 
        
        return d.deflate() 
    }
}