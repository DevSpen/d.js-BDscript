const available = require("../utils/messageProperties")

module.exports = {
    name: "$getMessage",
    description: "returns specific data from given message",
    brackets: true,
    fields: [{
        name: "channelID",
        description: "the channel the message was sent in",
        type: "string"
    }, {
        name: "messageID",
        description: "the message to get data from",
        type: "string"
    }, {
        name: "option",
        description: "property to get from the message, listed in /message-properties.",
        type: "string"
    }, {
        name: "index",
        description: "when getting attachments or field name/value, you need to specify the index for the attachment or field.",
        type: "number"
    }, {
        name: "embedIndex",
        description: "when getting an embed property, you may specify the index of the embed.",
        type: "number"
    }],
    returns: "?any",
    execute: async d => {
        const [
            channelID,
            messageID,
            option,
            index = 1,
            embedIndex = 1
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return undefined
        
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const fn = available[option]
        
        if (!fn) return d.sendError("option", option)
        
        const data = eval(`msg${typeof fn === "function" ? fn(Number(embedIndex) - 1 ?? 0, Number(index) - 1 ?? 0) : fn}`) ?? ""
        
        return d.deflate(data)
    }
}