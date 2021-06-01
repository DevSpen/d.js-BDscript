const regexes = require("../utils/regexes")

module.exports = {
    name: "$findChannel",
    brackets: true,
    description: "finds a channel by using either their ID, name or mention.",
    returns: "?string",
    fields: [{
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
            option,
            returnChannel = "yes"
        ] = (await d.resolveArray()) || []
        
        if (option === undefined) return undefined
        
        const channel = d.client.channels.cache.get(option.replace(/[<>#]/g, "")) ?? d.client.channels.cache.find(ch => ch.name === option)
        
        return d.deflate(channel?.id || (returnChannel === "yes" ? d.message?.channel?.id || "" : ""))
    }
}