module.exports = {
    name: "$removeAllReactions",
    description: "removes all reactions of a message",
    brackets: true,
    fields: [{
        name: "channelID",
        description: "the channel where the message was sent in",
        type: "string"
    }, {
        name: "messageID",
        description: "the message to remove all reactions from",
        type: "string"
    }],
    execute: async d => {
        const [
            channelID,
            messageID
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const r = await msg.reactions.removeAll().catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to delete all message reactions!`)
        
        return d.deflate()
    }
}