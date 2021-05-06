const regexes = require("../utils/regexes")

module.exports = {
    name: "$findServerChannel",
    brackets: true,
    description: "finds a channel in a server by using either their ID, name or mention.",
    returns: "?string",
    fields: [{
        name: "guildID",
        type: "string",
        description: "the guild to find the channel in"
    }, {
        name: "option",
        type: "string",
        description: "the channel ID, mention or name"
    }, {
        name: "returnChannelID",
        type: "boolean",
        description: `whether to return the current channel ID if no user was found`
    }],
    execute: async d => {
        const [
            guildID,
            option,
            returnChannel = "yes"
        ] = (await d.resolveArray()) || []
        
        if (guildID === undefined) return undefined
        
        const guild = d.client.guilds.cache.get(guildID)
        
        if (!guild) return d.sendError("guildID", guildID)
        
        const channel = guild.channels.cache.get(option.replace(/[<>#]/g, "")) ?? guild.channels.cache.find(ch => ch.name === option)
        
        return d.deflate(channel?.id || (returnChannel === "yes" ? d.message?.channel?.id || "" : ""))
    }
}