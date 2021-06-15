const Function = require("../structures/Function")

module.exports = new Function({
    name: "$channelGuildID",
    brackets: true,
    optional: true,
    description: "return the guild this channel belongs to.",
    returns: "?string",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to get guild from"
    }],
    execute: async d => {
        if (d.value.inside) {
            const data = await d.resolveAll()
            
            if (data === undefined) return undefined
            
            const channel = d.client.channels.cache.get(data)
            
            if (!channel) return d.sendError("channel ID", data)
            
            return d.deflate(channel.guild?.id ?? "") 
        } else {
            return d.deflate(d.message?.channel?.guild?.id ?? "")
        }
    }
})