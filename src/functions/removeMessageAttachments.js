module.exports = {
    name: "$removeMessageAttachments",
    description: "Removes attachments from a message.",
    brackets: true,
    fields: [{
        name: "channelID",
        description: "The channel where this message was sent.",
        type: "string"
    }, {
        name: "messageID",
        description: "The message to remove attachments from.",
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

        const sup = await msg.removeAttachments().catch(err => null)

        if (!sup) return d.sendError(`:x: Failed to remove attachments!`)

        return d.deflate() 
    }
}
