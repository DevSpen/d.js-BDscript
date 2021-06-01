const play = async (client, guildID) => {
    const ytdl = require("ytdl-core")
    
    const server = client.bot.ytdl_servers.get(guildID)
    
    if (!server) return null 
    
    const song = server.songs[0]
    
    const dispatcher = await server.connection.play(ytdl(server.songs[0].url), {
        volume: server.volume / 100
    })
    
    dispatcher.once("finish", () => {
        const server = client.bot.ytdl_servers.get(guildID)
        
        server.status = "waiting"
        
        if (server.loop === 0) {
            server.songs.shift()
        }
        
        client.bot.ytdl_servers.set(guildID, server)
        
        client.emit("guildMusicEnd", client.guilds.cache.get(guildID), song)
        
        if (!server.songs.length) return undefined
        
        play(client, guildID)
    })
    
    dispatcher.once("start", () => {
        server.status = "playing"
        client.bot.ytdl_servers.set(guildID, server)
        client.emit("guildMusicStart", client.guilds.cache.get(guildID), song)
    })
}

module.exports = play