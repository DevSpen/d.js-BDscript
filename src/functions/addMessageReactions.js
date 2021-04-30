module.exports = {
    name: "$addMessageReactions",
    brackets: true,
    description: "add reactions to a message",
    fields: [{
        name: "channelID",
        description: "the channel where thid message was sent in",
        type: "string"
    }, {
        name: "messageID",
        description: "the message to react to",
        type: "string"
    }, {
        name: "emoji",
        description: "the emoji to react with",
        type: "string"
    }],
    execute: async d => {
        const [
            channelID,
            messageID,
            ...reactions
        ] = (await d.resolveArray()) || []
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        for (const r of reactions) {
            const add = await msg.react(r).catch(err => null)
            
            if (!add) return d.sendError(`:x: Failed to react with '${r}'`)
        }
        
        return d.deflate()
    }
}