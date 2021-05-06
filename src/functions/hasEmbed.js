module.exports = {
    name: "$hasEmbed",
    description: "checks whether a message has embeds or not",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where this message is in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to check embeds"
    }],
    returns: "boolean",
    brackets: true,
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
        
        return d.deflate(Boolean(msg.embeds.length)) 
    }
}