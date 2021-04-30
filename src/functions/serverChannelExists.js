const regexes = require("../utils/regexes")

module.exports = {
    name: "$serverChannelExists",
    brackets: true,
    description: "check whether or not given channel ID exists in a guild",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to check for the channel"
    }, {
        name: "channelID",
        type: "string",
        description: "the channel to check for"
    }],
    returns: "boolean",
    execute: async d => {
        const [
            guildID, 
            channelID
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        return d.deflate(guild.channels.cache.has(channelID))
    }
}