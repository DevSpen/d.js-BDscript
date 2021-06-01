module.exports = {
    name: "$referenceGuildID",
    description: "the ID of the guild where this message was replied from",
    returns: "?string",
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel to get the replied guild ID",
    }, {
        name: "messageID",
        description: "the message to get its replied guild",
        type: "string"
    }],
    brackets: true,
    optional: true,
    execute: async d => {
        if (!d.value.inside) {
            return d.deflate(d.message?.reference?.guildID ?? "")
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
        
        return d.deflate(msg.reference?.guildID ?? "")
    }
}