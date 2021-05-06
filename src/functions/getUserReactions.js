const getReactions = require("../utils/fetchUserReactions")

module.exports = {
    name: "$getUserReactions",
    description: "list users that reacted to given emoji under a message",
    returns: "?string",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where this message is in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to fetch user reactions from"
    }, {
        name: "emoji",
        type: "string",
        description: "the emoji to get the users from"
    }, {
        name: "option",
        type: "string",
        description: "the property to return for each user, can be `id`, `mention`, `username`, `count`, etc..."
    }, {
        name: "separator",
        type: "string",
        description: "the separator for each user"
    }],
    brackets: true,
    execute: async d => {
        const [
            channelID,
            messageID,
            emoji,
            option = "username",
            separator = ", "
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const reaction = msg.reactions.cache.find(r => r.emoji.toString() === emoji)
        
        if (!reaction) return d.deflate()
        
        const users = await getReactions(reaction)
        
        return d.deflate(option === "count" ? users.size : users.map(u => option === "mention" ? u.toString() : u[option] ?? "").join(separator)) 
    }
}