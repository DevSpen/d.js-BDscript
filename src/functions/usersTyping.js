const Discord = require("discord.js")

module.exports = {
    name: "$usersTyping",
    description: "returns a list of users typing in a channel",
    returns: "?string|?number",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to list users typing from"
    }, {
        name: "option",
        type: "string",
        description: "the option to return for each user, can be `mention`, `username`, `count`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each user"
    }],
    brackets: true,
    execute: async d => {
        const [
            channelID,
            option = "username",
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const users = new Discord.Collection()
        
        for (const [id, data] of [...channel._typing.entries()]) {
            users.set(id, data.user)
        }
        
        return d.deflate(option === "count" ? users.size : users.map(u => option === "mention" ? u.toString() : u[option] ?? "").join(separator))
    }
}