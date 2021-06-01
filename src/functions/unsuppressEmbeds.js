module.exports = {
    name: "$unsuppressEmbeds",
    description: "unsuppress a message's embeds",
    brackets: true,
    fields: [{
        name: "channelID",
        description: "the channel where the message was sent in",
        type: "string"
    }, {
        name: "messageID",
        description: "the message to unsuppress its embeds",
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
        
        const sup = await msg.suppressEmbeds(false).catch(err => null)
        
        if (!sup) return d.sendError(`:x: Failed to unsuppress embeds!`)
        
        return d.deflate() 
    }
}