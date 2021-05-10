const available = require("../utils/song-properties")

module.exports = {
    name: "$songInfo",
    description: "returns info on a song added to the queue of this guild",
    brackets: true,
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to get song info from"
    }, {
        name: "option",
        description: "one of the properties listed in /song-properties",
        type: "string"
    }, {
        name: "songIndex",
        description: "the song to return info from, `1` stands for the song that is currently being played",
        type: "number"
    }],
    returns: "?any",
    execute: async d => {
        const [
            guildID,
            prop,
            index = 1
        ] = (await d.resolveArray()) ?? []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const server = d.client.bot.ytdl_servers.get(guildID)
        
        if (!server) return d.sendError(":x: Nothing playing!")
        
        const property = available[prop]
        
        if (!property) return d.sendError("song property", prop)
        
        const data = server.songs[Number(index) - 1 ?? 0]
        
        return d.deflate(data ? eval(`data${property}`) ?? "" : "")
    }
}