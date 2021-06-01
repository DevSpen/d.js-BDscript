module.exports = {
    name: "$referenceChannelID",
    description: "the ID of the channel where this message was replied to",
    returns: "?string",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to get the replied channel ID",
    }, {
        name: "messageID",
        description: "the message to get its replied channel",
        type: "string"
    }],
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.reference?.channelID ?? "")
        }
        
        const [
            channelID,
            messageID
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        return d.deflate(msg.reference?.channelID ?? "")
    }
}