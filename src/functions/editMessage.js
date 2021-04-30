module.exports = {
    name: "$editMessage",
    brackets: true,
    optional: true,
    fields: [{
        name: "channelID",
        type: "string",
        description: "the channel where the message was sent in"
    }, {
        name: "messageID",
        type: "string",
        description: "the message to edit"
    }, {
        name: "message",
        type: "string",
        description: "the new content for this message"
    }, {
        name: "returnMessageID",
        type: "boolean",
        description: "whether to return the edited message ID"
    }],
    description: "edits a message",
    returns: "?string",
    execute: async d => {
        let [
            channelID,
            messageID, 
            data,
            returnMessageID = "no"
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const m = await d.client.bot.resolveAPIMessage(msg, d.container.embed, data, "edit")
        
        return d.deflate(returnMessageID === "yes" ? m?.id || "" : "")
    }
}