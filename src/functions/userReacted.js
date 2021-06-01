const getReactions = require("../utils/fetchUserReactions")

module.exports = {
    name: "$userReacted",
    description: "checks whether an user has reacted to an emoji under a message",
    returns: "boolean",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where this message is in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to check the user reaction"
    }, {
        name: "userID",
        type: "string",
        description: "the user to check for"
    }, {
        name: "emoji",
        type: "string",
        description: "the emoji to get the users from"
    }],
    brackets: true,
    execute: async d => {
        const [
            channelID,
            messageID,
            userID,
            emoji
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const reaction = msg.reactions.cache.find(r => r.emoji.toString() === emoji)
        
        if (!reaction) return d.deflate(false)
        
        const users = await getReactions(reaction)
        
        return d.deflate(users.has(userID))
    }
}